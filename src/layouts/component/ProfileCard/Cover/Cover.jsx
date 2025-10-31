
import { Camera } from 'lucide-react';
import style from './Cover.module.scss';
import className from 'classnames/bind';

const cx = className.bind(style);
const Cover = ({ imageUrl, onEdit, editable = false }) => {
  return (
    <div className={cx("cover-container")}>
      <div
        className={cx("cover-image")}
        style={{ backgroundImage: "url('/images/sach.jpg')" }}
      ></div>
      {editable && (
        <button onClick={onEdit} className={cx("cover-edit-button")} aria-label="Edit cover">
          {/* <Camera className="icon" /> */}
        </button>
      )}
    </div>
  );
};

// Avatar Component - Ảnh đại diện

export default Cover;