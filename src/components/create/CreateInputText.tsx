import React from 'react';

interface ICreateInputTextProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
const CreateInputText: React.FC<ICreateInputTextProps> = ({ label, placeholder, name, value, onChangeHandler }) => {
  return (
    <div className="flex flex-row items-center space-x-9 mb-[2rem]">
      <div className="text-xl font-bold text-gray-700 w-[95px]">{label}</div>
      <input
        className={`w-[75%] max-w-[600px] px-3 py-5 text-2xl leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded-xl appearance-none my[0.55rem] focus:outline-none focus:shadow-outline`}
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default CreateInputText;
