import style from './EditButton.module.scss'
import ClassName from 'classnames/bind'
import {FaCamera} from 'react-icons/fa'
const cx = ClassName.bind(style);

const EditButton = ({ onClick, label = "Chỉnh sửa ảnh bìa", icon: Icon = FaCamera }) => {
  return (
    <button onClick={onClick} className={cx("edit-button")}>
      <Icon size={18} className="icon-small" />
      {label}
    </button>
  );
};
export default EditButton;