import React, { useEffect, useState } from 'react';
import { IMovie } from '../../interfaces';
import { getVideosFirstPage, getVideosNextPage } from '../api';
import NoData from '../common/NoData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addMovieData, resetActiveMovieData, setActiveMovieData } from '../../store/movieSlice';
import styles from './MoviesScreen.module.scss';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { MODAL_STYLE } from '../../contsants';
import ButtonLoader from '../common/ButtonLoader';

const PAGE_SIZE = 10;

const MoviesScreen: React.FC = () => {
  const [fetchCount, setFetchCount] = useState(0);
  // const [videoData, setVideoData] = useState<IMovie[]>([]);
  // const [lastCreatedAt, setLastCreatedAt] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const videoData = useSelector((state: RootState) => state.movie.data);
  const lastCreatedAt = useSelector((state: RootState) => state.movie.lastCreatedAt);
  const [activePopupData, setActivePopupData] = useState<IMovie>();
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //
  const setData = (res: any) => {
    const _data = res.data as IMovie[];
    const _lastCreatedAt = res.lastCreatedAt as number;
    if (_data.length > 0) {
      dispatch(addMovieData({ data: _data, lastCreatedAt: _lastCreatedAt }));
    } else {
      toast.error('You have reached maximum');
    }
    if (_data.length == PAGE_SIZE) {
      setHasMore(true); // If less than the page size, we're at the end
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
  };
  //
  const getFirstPage = async () => {
    setIsLoading(true);
    const _res = await getVideosFirstPage(PAGE_SIZE);
    setData(_res);
  };
  //
  const getNextPage = async () => {
    // if (!(lastVisibleDoc && hasMore)) return;
    if (!lastCreatedAt) return;
    setIsLoading(true);
    const _res = await getVideosNextPage(PAGE_SIZE, lastCreatedAt);
    setData(_res);
  };

  useEffect(() => {
    console.log({ lastCreatedAt, hasMore });
  }, [lastCreatedAt, hasMore]);
  //

  const [isMovieCardPopupVisible, setIsMovieCardPopupVisible] = useState(false);
  const [isActionSpinnerVisible, setIsActionSpinnerVisible] = useState(false);

  const closeMovieCardPopupDialog = () => {
    setIsMovieCardPopupVisible(false);
    setIsActionSpinnerVisible(false);
  };
  //
  const deleteBtnOnClickHandler = async () => {
    toast.loading('please wait ...');
    toast.dismiss();
  };
  //
  return (
    <>
      <div className="h-[100%] overflow-hidden">
        {!hasMore && videoData.length <= 0 && (
          <button className="pb-2" onClick={() => getFirstPage()}>
            Fetch
          </button>
        )}
        <button className="pb-2" onClick={() => getNextPage()}>
          FetchMore
        </button>
        <div className="pb-2" onClick={() => getNextPage()}>
          Count{`( ${videoData?.length} )`}
        </div>
        <div
          className={`bg-red-100  overflow-y-scroll h-[80%]`}
          // onScroll={(e: any) => {
          //   if (isLoading) return;
          //   const { scrollTop, scrollHeight, clientHeight } = e.target;
          //   const isBottom = scrollTop + clientHeight >= scrollHeight - 1;
          //   if (isBottom && hasMore) {
          //     console.log(isBottom, 'isBottom');
          //     getNextPage();
          //   }
          // }}
        >
          <div className={`${styles.videosContainer}`}>
            {videoData?.length > 0 ? (
              videoData?.map((movie: IMovie, index: number) => {
                return (
                  <div
                    key={index}
                    className={`${styles.videosCard} ${activePopupData?.videoId == movie?.videoId ? 'bg-red-600' : 'bg-green-300'} cursor-pointer `}
                    onMouseEnter={() => {
                      setActivePopupData(movie);
                    }}
                    onMouseLeave={() => {
                      setActivePopupData(movie);
                    }}
                  >
                    <button
                      onClick={() => {
                        setActivePopupData(movie);
                        setIsMovieCardPopupVisible(true);
                      }}
                    >
                      View
                    </button>
                    <div className="text-xl h-[125px] font-semibold">{movie.title}</div>
                  </div>
                );
              })
            ) : (
              <div>
                <NoData />
              </div>
            )}
            {isLoading && <div>loading</div>}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isMovieCardPopupVisible}
        onRequestClose={closeMovieCardPopupDialog}
        style={MODAL_STYLE}
        contentLabel="Movie Card Dialog"
        ariaHideApp={false}
      >
        <div className={`m-6`}>
          <div className="flex justify-end cursor-pointer" onClick={closeMovieCardPopupDialog}>
            {/* <Image src="/images/close.svg" alt="close" width={15} height={15} /> */}
            closeImg
          </div>
          <div
            style={{ height: 565, width: 685 }}
            className={`flex flex-col justify-center text-[1.4rem] text-center font-semibold`}
          >
            <img src={activePopupData?.imageUrl} alt="imageUrl" width={150} height={150} />
            <div className={''}>{activePopupData?.title || 'title'}</div>
            <div className={''}>{activePopupData?.slug}</div>
            <a href={activePopupData?.url} target="_blank" className={''}>
              link
            </a>
            <div className="flex flex-row justify-center mt-[3.2rem] space-x-12">
              <button
                type="button"
                onClick={() => {
                  closeMovieCardPopupDialog();
                }}
                className={''}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteBtnOnClickHandler();
                }}
                className={`${''} ${isActionSpinnerVisible ? 'pointer-events-none' : 'cursor-pointer'}`}
              >
                {isActionSpinnerVisible ? <ButtonLoader /> : 'Delete'}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (activePopupData) {
                    dispatch(setActiveMovieData({ activeData: activePopupData }));
                    closeMovieCardPopupDialog();
                    navigate('/update');
                  }
                }}
                className={`${''} ${isActionSpinnerVisible ? 'pointer-events-none' : 'cursor-pointer'}`}
              >
                {isActionSpinnerVisible ? <ButtonLoader /> : 'Update'}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MoviesScreen;
