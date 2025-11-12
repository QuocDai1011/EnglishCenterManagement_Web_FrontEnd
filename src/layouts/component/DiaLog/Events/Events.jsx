import { useState } from 'react';
import { FaPhotoVideo } from 'react-icons/fa';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
    Avatar,
    TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Events({ open, onClose }) {
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        eventName: '',
        description: '',
        address: '',
        startDate: '',
        endDate: '',
    });

    const handleClose = () => {
        setImages([]);
        setFormData({
            eventName: '',
            description: '',
            address: '',
            startDate: '',
            endDate: '',
        });
        onClose();
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const previewURLs = files.map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, ...previewURLs]);
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handlePost = () => {
        console.log('Event data:', formData);
        console.log('Images:', images);
        alert('Tạo sự kiện thành công!');
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    overflow: 'hidden',
                    maxWidth: '650px',
                },
            }}
        >
            {/* Header */}
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: 700,
                    fontSize: '20px',
                    padding: '20px 24px',
                    borderBottom: '1px solid #e4e6eb',
                }}
            >
                Tạo sự kiện
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        backgroundColor: '#f0f2f5',
                        '&:hover': {
                            backgroundColor: '#e4e6eb',
                        },
                    }}
                >
                    <CloseIcon sx={{ fontSize: 20 }} />
                </IconButton>
            </DialogTitle>

            {/* Body */}
            <DialogContent sx={{ p: 3 }}>
                {/* User Info */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                    <Avatar src="/images/logo2019_png_1.png" alt="Avatar" sx={{ width: 40, height: 40 }} />
                    <div style={{ marginLeft: 12 }}>
                        <p style={{ fontWeight: 600, margin: 0, fontSize: '15px' }}>Quản Lý</p>
                        <small style={{ color: '#65676b', fontSize: '13px' }}>Công khai</small>
                    </div>
                </div>

                {/* Tên sự kiện */}
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Tên sự kiện"
                    value={formData.eventName}
                    onChange={(e) => handleInputChange('eventName', e.target.value)}
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f0f2f5',
                            borderRadius: '8px',
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '15px',
                            padding: '16px 14px',
                            backgroundColor: 'white',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#1877F2',
                        },
                        '& .MuiInputLabel-root': {
                            fontSize: '15px',
                            backgroundColor: 'white', // 🔥 Thêm background
                            padding: '0 10px 0 5px',
                        },
                        '& .MuiInputLabel-shrink': {
                            fontSize: '13px',
                            backgroundColor: 'white',
                        },
                        '& .MuiInputLabel-outlined': {
                            fontSize: '16px',
                        },
                    }}
                />

                {/* Mô tả */}
                <TextField
                    fullWidth
                    label="Mô tả"
                    variant="outlined"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f0f2f5',
                            borderRadius: '8px',
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '15px',
                            padding: '16px 14px',
                            backgroundColor: 'white',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#1877F2',
                        },
                        '& .MuiInputLabel-root': {
                            fontSize: '15px',
                            backgroundColor: 'white', // 🔥 Thêm background
                            padding: '0 10px 0 5px',
                        },
                        '& .MuiInputLabel-shrink': {
                            fontSize: '13px',
                            backgroundColor: 'white',
                        },
                        '& .MuiInputLabel-outlined': {
                            fontSize: '16px',
                        },
                    }}
                />

                {/* Địa chỉ */}
                <TextField
                    fullWidth
                    label="Địa chỉ"
                    variant="outlined"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f0f2f5',
                            borderRadius: '8px',
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '15px',
                            padding: '16px 14px',
                            backgroundColor: 'white',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#1877F2',
                        },
                        '& .MuiInputLabel-root': {
                            fontSize: '15px',
                            backgroundColor: 'white', // 🔥 Thêm background
                            padding: '0 10px 0 5px',
                        },
                        '& .MuiInputLabel-shrink': {
                            fontSize: '13px',
                            backgroundColor: 'white',
                        },
                        '& .MuiInputLabel-outlined': {
                            fontSize: '16px',
                        },
                    }}
                />

                {/* Ngày bắt đầu */}
                <div style={{ marginBottom: 16 }}>
                    <label
                        style={{
                            display: 'block',
                            fontSize: '13px',
                            color: '#65676b',
                            marginBottom: 8,
                            fontWeight: 500,
                        }}
                    >
                        Ngày bắt đầu
                    </label>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        variant="outlined"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#f0f2f5',
                                borderRadius: '8px',
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                            '& .MuiInputBase-input': {
                                fontSize: '15px',
                                padding: '12px 14px',
                            },
                        }}
                    />
                </div>

                {/* Ngày kết thúc */}
                <div style={{ marginBottom: 16 }}>
                    <label
                        style={{
                            display: 'block',
                            fontSize: '13px',
                            color: '#65676b',
                            marginBottom: 8,
                            fontWeight: 500,
                        }}
                    >
                        Ngày kết thúc
                    </label>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        variant="outlined"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#f0f2f5',
                                borderRadius: '8px',
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                            '& .MuiInputBase-input': {
                                fontSize: '15px',
                                padding: '12px 14px',
                            },
                        }}
                    />
                </div>

                {/* Image Preview */}
                {images.length > 0 && (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                            gap: '10px',
                            marginBottom: '16px',
                        }}
                    >
                        {images.map((img, i) => (
                            <div
                                key={i}
                                style={{
                                    position: 'relative',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={img}
                                    alt={`preview-${i}`}
                                    style={{
                                        width: '100%',
                                        height: '120px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                    }}
                                />
                                <IconButton
                                    size="small"
                                    onClick={() => handleRemoveImage(i)}
                                    sx={{
                                        position: 'absolute',
                                        top: 4,
                                        right: 4,
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
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
                    component="label"
                    fullWidth
                    variant="outlined"
                    endIcon={<FaPhotoVideo size={30}/>}
                    sx={{
                        justifyContent: 'space-between',
                        borderRadius: '8px',
                        textTransform: 'none',
                        color: '#050505',
                        fontSize: '15px',
                        fontWeight: 500,
                        border: '1px solid #ced0d4',
                        backgroundColor: 'white',
                        padding: '20px 16px',
                        '&:hover': {
                            backgroundColor: '#f0f2f5',
                            border: '1px solid #ced0d4',
                        },
                    }}
                >
                    Thêm vào sự kiện của bạn
                    <input hidden accept="image/*" multiple type="file" onChange={handleFileChange} />
                </Button>
            </DialogContent>

            {/* Footer */}
            <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '15px',
                        backgroundColor: '#4267B2',
                        padding: '10px',
                        boxShadow: 'none',
                        ':hover': {
                            backgroundColor: '#365899',
                            boxShadow: 'none',
                        },
                    }}
                    onClick={handlePost}
                >
                    TẠO
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Events;
