import { FaCamera } from "react-icons/fa6";
import style from './Avatar.module.scss'
import className from 'classnames/bind'

const cx = className.bind(style);

const Avatar = ({ imageUrl, name, onEdit, editable = false, size = 'large' }) => {
  return (
    <div className={cx("avatar-container", `avatar-${size}`)}>
      <div className={cx("avatar-wrapper")}>
        {imageUrl ? (
          <img src={imageUrl} alt={name} className={cx("avatar-image")} />
        ) : (
          <div className={cx("avatar-placeholder")}>
            {name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        )}
      </div>
      {editable && (
        <button onClick={onEdit} className={cx("avatar-edit-button")} aria-label="Edit avatar">
          <FaCamera size={26} className={cx("icon-small")} />
        </button>
      )}
    </div>
  );
};

export default Avatar;