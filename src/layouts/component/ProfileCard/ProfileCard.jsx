// ProfileCard Component - Component chính kết hợp tất cả
import EditButton from "./EditButton";
import Avatar from "./Avatar";
import Cover from "./Cover";
import {useState} from 'react';
import {Camera} from 'lucide-react';
import style from './ProfileCard.module.scss';
import className from 'classnames/bind'
import { FaCamera } from "react-icons/fa6";

const cx = className.bind(style);

const ProfileCard = ({ 
  coverImage, 
  avatarImage, 
  name, 
  title,
  editable = true 
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleCoverEdit = () => {
    console.log('Edit cover clicked');
  };

  const handleAvatarEdit = () => {
    console.log('Edit avatar clicked');
  };

  return (
    <div className={cx("profile-card-wrapper")}>
      <div className={cx("profile-card")}>
        {/* Cover Section */}
        <Cover 
          imageUrl={coverImage}
          onEdit={handleCoverEdit}
          editable={editable}
        />

        {/* Avatar & Info Section */}
        <div className={cx("profile-card-content")}>
          {/* Avatar positioned to overlap cover */}
          <div className={cx("avatar-section")}>
            <Avatar
              imageUrl={avatarImage}
              name={name}
              onEdit={handleAvatarEdit}
              editable={editable}
              size="large"
            />
          </div>

          

          {/* Edit Button */}
          {editable && (
            <div className={cx("button-section")}>
              <EditButton 
                onClick={() => setIsEditing(!isEditing)}
                label="Chỉnh sửa ảnh bìa"
                icon={FaCamera}
              />
            </div>
          )}
        </div>
      </div>
        {/* User Info */}
          <div className={cx("user-info")}>
            <h2 className={cx("user-name")}>{name}</h2>
            {/* <p className={cx("user-title")}>{title}</p> */}
          </div>
    </div>
  );
};
export default ProfileCard;