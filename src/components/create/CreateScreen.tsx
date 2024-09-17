import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { ICreateMovieFormData, IMovie } from '../../interfaces';
import ReactDropdown, { Option } from 'react-dropdown';
import { ConfirmDialog } from '../common';
import { addVideoDocument, updateVideoDocument } from '../api';

import styles from './CreateScreen.module.scss';
import CreateInputText from './CreateInputText';
import { arraysEqualWithIndex } from '../../contsants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { updateMovieData } from '../../store/movieSlice';
import { getCurrentEpochTimestamp } from '../../utils/timeUtil';

interface ICreateScreenProps {
  isEditScreen?: boolean;
}

const CreateScreen: React.FC<ICreateScreenProps> = ({ isEditScreen = false }) => {
  const activeMovieData = useSelector((state: RootState) => state.movie.activeData);
  const defaultCreateFormData = useMemo<ICreateMovieFormData>(() => {
    return {
      title: isEditScreen ? (activeMovieData?.title as string) : '',
      slug: isEditScreen ? (activeMovieData?.slug as string) : '',
      url: isEditScreen ? (activeMovieData?.url as string) : '',
      imageUrl: isEditScreen ? (activeMovieData?.imageUrl as string) : '',
      actors: isEditScreen ? (activeMovieData?.actors as string[]) : [],
      categories: isEditScreen ? (activeMovieData?.categories as string[]) : [],
      channel: isEditScreen ? (activeMovieData?.channel as string) : '',
      rank: isEditScreen ? (activeMovieData?.rank as number) : 1,
      tags: isEditScreen ? (activeMovieData?.tags as string[]) : [],
      status: isEditScreen ? (activeMovieData?.status as string) : 'unpublished',
    };
  }, [isEditScreen, activeMovieData]);
  const [videoFormData, setVideoFormData] = useState<ICreateMovieFormData>(defaultCreateFormData);
  const [isShowResetBtn, setIsShowResetBtn] = useState<boolean>(false);
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVideoFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isEditScreen) {
      if (
        videoFormData.title !== defaultCreateFormData.title ||
        videoFormData.slug !== defaultCreateFormData.slug ||
        videoFormData.url !== defaultCreateFormData.url ||
        videoFormData.imageUrl !== defaultCreateFormData.imageUrl ||
        videoFormData.channel !== defaultCreateFormData.channel ||
        !arraysEqualWithIndex(videoFormData.actors, defaultCreateFormData.actors) ||
        !arraysEqualWithIndex(videoFormData.categories, defaultCreateFormData.categories) ||
        !arraysEqualWithIndex(videoFormData.tags, defaultCreateFormData.tags) ||
        videoFormData.status !== defaultCreateFormData.status ||
        videoFormData.rank !== defaultCreateFormData.rank
      ) {
        setIsShowResetBtn(true);
        setIsSubmitBtnDisabled(false);
      } else {
        setIsShowResetBtn(false);
        setIsSubmitBtnDisabled(true);
      }
    } else {
      if (
        videoFormData.title !== defaultCreateFormData.title &&
        videoFormData.slug !== defaultCreateFormData.slug &&
        videoFormData.url !== defaultCreateFormData.url &&
        videoFormData.imageUrl !== defaultCreateFormData.imageUrl &&
        videoFormData.channel !== defaultCreateFormData.channel &&
        !arraysEqualWithIndex(videoFormData.actors, defaultCreateFormData.actors) &&
        !arraysEqualWithIndex(videoFormData.categories, defaultCreateFormData.categories) &&
        !arraysEqualWithIndex(videoFormData.tags, defaultCreateFormData.tags)
      ) {
        setIsShowResetBtn(true);
        setIsSubmitBtnDisabled(false);
      } else {
        setIsShowResetBtn(false);
        setIsSubmitBtnDisabled(true);
      }
    }
  }, [videoFormData, defaultCreateFormData]);

  const [isActionSpinnerVisible, setIsActionSpinnerVisible] = useState(false);
  const [isActionConfirmDialogVisible, setIsActionConfirmDialogVisible] = useState(false);

  const closeConfirmDialog = () => {
    setIsActionSpinnerVisible(false);
    setIsActionConfirmDialogVisible(false);
  };

  const actionBtnOnClickHandler = async () => {
    toast.loading('please wait ...');
    if (isEditScreen) {
      //updateMovie
      const _videoId = activeMovieData?.videoId;
      if (!_videoId || _videoId?.length <= 0) {
        toast.dismiss();
        closeConfirmDialog();
        toast.error('Something went wrong.Please try again !');
        console.log('updateVideo Error:: video id not found');
        return;
      }
      const _updateFormData: { [key: string]: any } = {};
      if (videoFormData.title !== defaultCreateFormData.title) {
        _updateFormData.title = videoFormData.title;
      }
      if (videoFormData.slug !== defaultCreateFormData.slug) {
        _updateFormData.slug = videoFormData.slug;
      }
      if (videoFormData.url !== defaultCreateFormData.url) {
        _updateFormData.url = videoFormData.url;
      }
      if (videoFormData.imageUrl !== defaultCreateFormData.imageUrl) {
        _updateFormData.imageUrl = videoFormData.imageUrl;
      }
      if (videoFormData.channel !== defaultCreateFormData.channel) {
        _updateFormData.channel = videoFormData.channel;
      }
      if (!arraysEqualWithIndex(videoFormData.actors, defaultCreateFormData.actors)) {
        _updateFormData.actors = videoFormData.actors.filter((str) => {
          str !== '';
        });
      }
      if (!arraysEqualWithIndex(videoFormData.categories, defaultCreateFormData.categories)) {
        _updateFormData.categories = videoFormData.categories.filter((str) => {
          str !== '';
        });
      }
      if (!arraysEqualWithIndex(videoFormData.tags, defaultCreateFormData.tags)) {
        _updateFormData.tags = videoFormData.tags.filter((str) => {
          str !== '';
        });
      }
      if (videoFormData.status !== defaultCreateFormData.status) {
        _updateFormData.status = videoFormData.status;
      }
      if (videoFormData.rank !== defaultCreateFormData.rank) {
        _updateFormData.rank = videoFormData.rank;
      }
      console.log(_updateFormData, 'updateFormData');
      if (Object.keys(_updateFormData).length > 0) {
        _updateFormData.updatedAt = getCurrentEpochTimestamp();
      } else {
        toast.dismiss();
        toast.error('Please enter valid input');
        return;
      }
      try {
        console.log(_updateFormData, 'updateFormData');
        await updateVideoDocument(activeMovieData.videoId, _updateFormData);
        dispatch(updateMovieData({ videoId: activeMovieData.videoId, updateData: _updateFormData }));
        toast.dismiss();
        closeConfirmDialog();
        navigate(-1); //previous route
        toast.success('success');
      } catch (e) {
        toast.dismiss();
        closeConfirmDialog();
        console.log('updateVideo Error::', e);
        toast.error('Something went wrong.Please try again !');
      }
    } else {
      //createVideo
      try {
        const _createInput: ICreateMovieFormData = {
          ...videoFormData,
          tags: videoFormData.tags.filter((str) => {
            str !== '';
          }),
          actors: videoFormData.actors.filter((str) => {
            str !== '';
          }),
          categories: videoFormData.categories.filter((str) => {
            str !== '';
          }),
        };
        console.log(_createInput, '_createInput');
        await addVideoDocument(_createInput);
        toast.dismiss();
        closeConfirmDialog();
        navigate('/movies');
        toast.success('success');
      } catch (e) {
        toast.dismiss();
        closeConfirmDialog();
        console.log('addVideo Error::', e);
        toast.error('Something went wrong.Please try again !');
      }
    }
  };
  //
  const maxRank = 500;
  const ranks = [];
  for (let i = 1; i <= maxRank; i++) {
    ranks.push(i.toString());
  }
  useEffect(() => {
    console.log(activeMovieData, 'activeMovieData');
  }, [activeMovieData]);
  //
  return (
    <>
      <div className={`${styles.container}`}>
        {isEditScreen && !activeMovieData ? (
          <div>Something went wrong</div>
        ) : (
          <div className={`p-12 pb-40`}>
            <div className="flex flex-col space-y-4 mx-[2rem]">
              <CreateInputText
                name="title"
                label="Video Name"
                placeholder="please enter video name"
                value={videoFormData.title}
                onChangeHandler={handleChange}
              />
              <CreateInputText
                name="slug"
                label="Slug"
                placeholder="please enter slug"
                value={videoFormData.slug}
                onChangeHandler={handleChange}
              />
              <CreateInputText
                name="url"
                label="Video Url"
                placeholder="please enter video url"
                value={videoFormData.url}
                onChangeHandler={handleChange}
              />
              <CreateInputText
                name="imageUrl"
                label="Thumbnail Image Url"
                placeholder="please enter image url"
                value={videoFormData.imageUrl}
                onChangeHandler={handleChange}
              />
              <CreateInputText
                name="actors"
                label="Actors"
                placeholder="please enter actors"
                value={videoFormData.actors.join(',')}
                onChangeHandler={(e) => {
                  const _actors = e.target.value.split(',');
                  const isEmpty = arraysEqualWithIndex(_actors, ['']);
                  setVideoFormData({
                    ...videoFormData,
                    actors: isEmpty ? [] : _actors,
                  });
                }}
              />
              <CreateInputText
                name="categories"
                label="Categories"
                placeholder="please enter categories"
                value={videoFormData.categories.join(',')}
                onChangeHandler={(e) => {
                  const _categories = e.target.value.split(',');
                  const isEmpty = arraysEqualWithIndex(_categories, ['']);
                  setVideoFormData({
                    ...videoFormData,
                    categories: isEmpty ? [] : _categories,
                  });
                }}
              />
              <CreateInputText
                name="channel"
                label="Channel"
                placeholder="please enter channel"
                value={videoFormData.channel}
                onChangeHandler={handleChange}
              />
              <CreateInputText
                name="tags"
                label="Tags"
                placeholder="please enter tags"
                value={videoFormData.tags.join(',')}
                onChangeHandler={(e) => {
                  const _tags = e.target.value.split(',');
                  const isEmpty = arraysEqualWithIndex(_tags, ['']);
                  setVideoFormData({
                    ...videoFormData,
                    tags: isEmpty ? [] : _tags,
                  });
                }}
              />
              <div className={`flex flex-row items-center space-x-9 mb-[2rem]`}>
                <div className="text-xl font-bold text-gray-700 w-[95px]">Rank :</div>
                <div className="w-[165px]">
                  <ReactDropdown
                    options={ranks}
                    controlClassName={styles.custom_dropdown_control}
                    menuClassName={styles.custom_dropdown_menu}
                    value={videoFormData.rank.toString()}
                    onChange={(event: Option) => {
                      setVideoFormData({
                        ...videoFormData,
                        rank: parseInt(event.value),
                      });
                    }}
                    placeholder={videoFormData.rank.toString()}
                  />
                </div>
              </div>
              <div className={`flex flex-row items-center space-x-9 mb-[2rem]`}>
                <div className="text-xl font-bold text-gray-700 w-[95px]">Status :</div>
                <div className="w-[165px]">
                  <ReactDropdown
                    options={['published', 'unpublished']}
                    controlClassName={styles.custom_dropdown_control}
                    menuClassName={styles.custom_dropdown_menu}
                    value={videoFormData.status}
                    onChange={(event: Option) => {
                      setVideoFormData({
                        ...videoFormData,
                        status: event.value,
                      });
                    }}
                    placeholder={videoFormData.status}
                  />
                </div>
              </div>
              <div className={`flex flex-row space-x-6 justify-start pt-[2.5rem]`}>
                {isShowResetBtn && (
                  <button
                    className={`${styles.createButton} bg-[#131415]`}
                    onClick={() => {
                      setVideoFormData(defaultCreateFormData);
                    }}
                  >
                    Reset
                  </button>
                )}
                <button
                  disabled={isSubmitBtnDisabled}
                  className={`${styles.createButton} ${
                    isSubmitBtnDisabled ? 'cursor-not-allowed bg-gray-400' : 'bg-[#963bf9]'
                  }`}
                  onClick={() => {
                    if (
                      videoFormData.title !== defaultCreateFormData.title ||
                      videoFormData.slug !== defaultCreateFormData.slug ||
                      videoFormData.url !== defaultCreateFormData.url ||
                      videoFormData.imageUrl !== defaultCreateFormData.imageUrl ||
                      videoFormData.channel !== defaultCreateFormData.channel ||
                      videoFormData.status !== defaultCreateFormData.status ||
                      videoFormData.actors !== defaultCreateFormData.actors ||
                      videoFormData.tags !== defaultCreateFormData.tags ||
                      videoFormData.categories !== defaultCreateFormData.categories ||
                      videoFormData.rank !== defaultCreateFormData.rank
                    ) {
                      setIsActionConfirmDialogVisible(true);
                    } else {
                      toast.error('please enter valid input');
                    }
                  }}
                >
                  {isEditScreen ? 'Update' : 'Create'}
                </button>
                <button
                  className={`${styles.createButton} bg-[#f50818]`}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/*on action confirm dialog*/}
      <ConfirmDialog
        isDialogVisible={isActionConfirmDialogVisible}
        setIsDialogVisible={setIsActionConfirmDialogVisible}
        description={`Are you sure you want to ${isEditScreen ? 'Update' : 'Create'} Video`}
        primaryBtnText={'No'}
        primaryBtnClassName={
          'px-8 py-3 text-2xl font-semibold tracking-wide text-white bg-gray-400 rounded-lg hover:bg-gray-700'
        }
        primaryBtnOnClickHandler={() => setIsActionConfirmDialogVisible(false)}
        secondaryBtnText={'Yes'}
        secondaryBtnClassName={`px-8 py-3 text-2xl font-semibold tracking-wide text-white bg-red-400 rounded-lg hover:bg-red-500`}
        secondaryBtnOnClickHandler={() => {
          actionBtnOnClickHandler();
        }}
        isActionSpinnerVisible={isActionSpinnerVisible}
      />
    </>
  );
};

export default CreateScreen;
