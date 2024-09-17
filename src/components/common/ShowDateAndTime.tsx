import moment from 'moment';

interface ShowDateAndTimeProps {
  date?: string;
  timestamp?: string;
}

const ShowDateAndTime: React.FC<ShowDateAndTimeProps> = ({ date = new Date().toString(), timestamp }) => {
  return timestamp ? (
    <div className={`flex flex-col w-32`}>
      <h1>{moment(parseInt(timestamp)).format('MMM Do, YYYY')}</h1>
      <h1 className={`text-[#A4A5AA]`}>{moment(parseInt(timestamp)).format('h:mm a')} </h1>
    </div>
  ) : (
    <div className={`flex flex-col`}>
      <h1>{moment(date).format('MMM Do, YYYY')}</h1>
      <h1 className={`text-[#A4A5AA]`}>{moment(date).format('h:mm a')}</h1>
    </div>
  );
};

export default ShowDateAndTime;
