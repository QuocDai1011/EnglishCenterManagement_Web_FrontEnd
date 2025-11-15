import style from './EditButton.module.scss'
import ClassName from 'classnames/bind'
import {FaCamera} from 'react-icons/fa'
import PostDialog from '../../DiaLog/PostDialog';
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