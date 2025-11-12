import { useState } from 'react';
import { FaPhotoVideo } from "react-icons/fa";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
    Avatar,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PublicIcon from "@mui/icons-material/Public";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import EmojiPicker from 'emoji-picker-react';

function PostDialog({ open, onClose }) {
    const [images, setImages] = useState([]);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [postContent, setPostContent] = useState('');

    const handleClose = () => {
        setImages([]);
        setSelectedEmoji('');
        setShowEmojiPicker(false);
        setPostContent('');
        onClose();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const previewURLs = files.map((file) => URL.createObjectURL(file));
        setImages(prev => [...prev, ...previewURLs]);
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleEmojiClick = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const onEmojiClick = (emojiData) => {
        setSelectedEmoji(emojiData.emoji);
        setShowEmojiPicker(false);
    };

    const handlePost = () => {
        // Logic đăng bài
        console.log('Post content:', postContent);
        console.log('Images:', images);
        console.log('Emoji:', selectedEmoji);
        alert("Đăng bài!");
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                sx: {
                    borderRadius: "12px",
                    overflow: "hidden",
                    p: 0,
                    maxWidth: '500px'
                },
            }}
        >
            {/* Header */}
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 600,
                    borderBottom: "1px solid #ddd",
                    fontSize: '17px',
                    padding: '16px'
                }}
            >
                Tạo bài viết
                <IconButton
                    onClick={handleClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            {/* Body */}
            <DialogContent sx={{ p: 2, mt: 2 }}>
                {/* User Info */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                    <Avatar src="/images/logo2019_png_1.png" alt="Avatar" />
                    <div style={{ marginLeft: 10 }}>
                        <p style={{ fontWeight: 600, margin: 0, fontSize: '14px' }}>Quản Lý</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <PublicIcon sx={{ fontSize: '14px', color: "#555" }} />
                            <small style={{ color: "#555", fontSize: '12px' }}>Công khai</small>
                        </div>
                    </div>
                </div>

                {/* Text Input */}
                <div style={{ position: 'relative' }}>
                    <TextField
                        fullWidth
                        multiline
                        placeholder="Bạn đang nghĩ gì, Lý?"
                        variant="standard"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        InputProps={{
                            disableUnderline: true,
                            style: { fontSize: '14px' }
                        }}
                        sx={{
                            mb: 2,
                            py: 3
                        }}
                    />
                    <IconButton
                        onClick={handleEmojiClick}
                        sx={{
                            position: 'absolute',
                            top: 20,
                            right: 0
                        }}
                    >
                        <SentimentSatisfiedAltIcon sx={{ color: '#65676b', width: 25, height: 25 }} />
                    </IconButton>

                    {selectedEmoji && (
                        <div style={{
                            marginTop: '-8px',
                            marginBottom: '8px',
                            fontSize: '14px',
                            color: '#1877F2'
                        }}>
                            Đang cảm thấy {selectedEmoji}
                        </div>
                    )}
                </div>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                    <>
                        <div
                            onClick={() => setShowEmojiPicker(false)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                zIndex: 1999
                            }}
                        />
                        <div style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 2000,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                            borderRadius: '12px',
                            overflow: 'hidden'
                        }}>
                            <EmojiPicker
                                onEmojiClick={onEmojiClick}
                                width={window.innerWidth > 500 ? 350 : 300}
                                height={window.innerHeight > 600 ? 450 : 400}
                                searchPlaceHolder="Tìm emoji..."
                                previewConfig={{
                                    showPreview: false
                                }}
                            />
                        </div>
                    </>
                )}

                {/* Image Preview */}
                {images.length > 0 && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                            gap: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        {images.map((img, i) => (
                            <div
                                key={i}
                                style={{
                                    position: "relative",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={img}
                                    alt={`preview-${i}`}
                                    style={{
                                        width: "100%",
                                        height: "120px",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                />
                                <IconButton
                                    size="small"
                                    onClick={() => handleRemoveImage(i)}
                                    sx={{
                                        position: "absolute",
                                        top: 4,
                                        right: 4,
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        color: "white",
                                        "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </div>
                        ))}
                    </div>
                )}

                {/* Upload Button */}
                <Button
                    endIcon={<FaPhotoVideo size={26} style={{ color: '#65676b' }} />}
                    component="label"
                    fullWidth
                    variant="outlined"
                    sx={{
                        justifyContent: "space-between",
                        borderRadius: "12px",
                        textTransform: "none",
                        color: "#555",
                        fontSize: '14px',
                        outline: 'none',
                        border: '1px solid #ccc',
                        py: 2
                    }}
                >
                    Thêm vào bài viết của bạn
                    <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handleFileChange}
                    />
                </Button>
            </DialogContent>

            {/* Footer */}
            <DialogActions sx={{ px: 2, pb: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: '17px',
                        backgroundColor: "#1877F2",
                        ":hover": { backgroundColor: "#166FE5" },
                    }}
                    onClick={handlePost}
                >
                    Đăng
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PostDialog;