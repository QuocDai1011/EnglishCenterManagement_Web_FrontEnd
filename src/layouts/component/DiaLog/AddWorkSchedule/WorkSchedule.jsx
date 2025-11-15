import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Switch,
    FormControlLabel,
    Chip,
    Box,
} from '@mui/material';
import { X } from 'lucide-react';
import TeacherService from '~/api/TeacherService';
import Swal from 'sweetalert2';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function WorkSchedule({open, onClose, date, onSubmit}) { // ⬅️ Thêm prop onSubmit
    const [formData, setFormData] = useState({
        branch: 'TRUNG TÂM NGOẠI NGỮ TRE XANH',
        type: 'None',
        category: '',
        title: '',
        object: '',
        user: 'QL-0000001 - Quản Lý',
        date: date || "",
        startTime: '08:33',
        endTime: '08:43',
        description: '',
        createForOthers: false,
    });

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await TeacherService.getAll();

                if (!response || response.length === 0) {
                    Swal.fire("Cảnh báo", "Danh sách giảng viên rỗng", "error");
                }

                setTeachers(response || []);
            } catch (e) {
                Swal.fire("Cảnh báo", `Lỗi khi lấy danh sách giảng viên: ${e}`, "error");
            }
        };

        fetchTeachers();
    }, []);

    // Cập nhật date khi prop date thay đổi
    useEffect(() => {
        if (date) {
            setFormData(prev => ({
                ...prev,
                date: date
            }));
        }
    }, [date]);

    const handleChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value,
        });
    };


    const handleSubmit = () => {
        // Validate form
        if (!formData.title) {
            Swal.fire({
                icon: 'warning',
                title: 'Cảnh báo',
                text: 'Vui lòng nhập tiêu đề!'
            });
            onClose();
            return;
        }

        if (!formData.category) {
            Swal.fire({
                icon: 'warning',
                title: 'Cảnh báo',
                text: 'Vui lòng chọn danh mục!'
            });
            onClose();
            return;
        }

        if (!formData.date) {
            Swal.fire({
                icon: 'warning',
                title: 'Cảnh báo',
                text: 'Vui lòng chọn ngày!'
            });
            onClose();
            return;
        }

        // Kiểm tra giờ bắt đầu < giờ kết thúc
        if (formData.startTime >= formData.endTime) {
            Swal.fire({
                icon: 'warning',
                title: 'Cảnh báo',
                text: 'Giờ kết thúc phải sau giờ bắt đầu!'
            });
            onClose();
            return;
        }

        // Gọi callback onSubmit để truyền data về component cha
        if (onSubmit) {
            onSubmit(formData);
        }

        // Reset form
        setFormData({
            branch: 'TRUNG TÂM NGOẠI NGỮ TRE XANH',
            type: 'None',
            category: '',
            title: '',
            object: '',
            user: 'QL-0000001 - Quản Lý',
            date: '',
            startTime: '08:33',
            endTime: '08:43',
            description: '',
            createForOthers: false,
        });
    };

    return (
        <Dialog fullWidth maxWidth='lg' open={open} onClose={onClose}>
            <DialogTitle
                sx={{
                    fontSize: '20px',
                    fontWeight: 600,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pb: 2,
                }}
            >
                Thêm mới lịch làm việc
                <Button
                    onClick={onClose}
                    sx={{ 
                        minWidth: 'auto', 
                        p: 0.5,
                        color: 'gray',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                    }}
                >
                    <X size={24} />
                </Button>
            </DialogTitle>

            <DialogContent sx={{ borderTop: '1px solid #e0e0e0', pt: 3 }}>
                <Grid container rowSpacing={1} 
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={{
                        mt:2,
                        gap:3,
                    }}>
                    {/* Cơ sở */}
                    <Grid size={6}>
                        <FormControl fullWidth size="medium">
                            <InputLabel
                             size='medium'
                             sx={{
                                fontSize: '16px',
                             }}
                             >Cơ sở *</InputLabel>
                            <Select
                                value={formData.branch}
                                label="Cơ sở *"
                                onChange={handleChange('branch')}
                                sx={{fontSize: '16px',
                                     '& .MuiSelect-icon':{
                                        fontSize: '2.5rem',
                                    }
                                }}
                            >
                                <MenuItem sx={{fontSize: '16px'}} value="TRUNG TÂM NGOẠI NGỮ TRE XANH">
                                    TRUNG TÂM NGOẠI NGỮ TRE XANH
                                </MenuItem>
                                <MenuItem sx={{fontSize: '16px'}} value="Cơ sở 2">Cơ sở 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Kiểu lặp */}
                    <Grid size={6}>
                        <FormControl fullWidth size="medium">
                            <InputLabel
                            sx={{fontSize: '16px', backgroundColor: 'white', px: 1, py: 0}}
                            >
                                Kiểu lặp
                            </InputLabel>
                            <Select
                                value={formData.type}
                                label="Kiểu lặp"
                                onChange={handleChange('type')}
                                sx={{fontSize: '16px',
                                     '& .MuiSelect-icon':{
                                        fontSize: '2.5rem',
                                    }
                                }}
                            >
                                {['None','Daily','Weekly','Monthly'].map((item) => (
                                    <MenuItem key={item} sx={{fontSize: '16px'}} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Danh mục */}
                    <Grid size={6}>
                        <FormControl fullWidth size="medium">
                            <InputLabel
                            sx={{fontSize: '16px', backgroundColor: 'white', px: 1, py: 0}}
                            >
                                Danh mục
                            </InputLabel>
                            <Select
                                value={formData.category}
                                label="Danh mục"
                                onChange={handleChange('category')}
                                sx={{fontSize:'16px',
                                     '& .MuiSelect-icon':{
                                        fontSize: '2.5rem',
                                    }
                                }}
                            >
                                {['Email','Gặp mặt đối tác','Gọi điện', 'Hẹn gặp', 'Khác', 'Kỷ niệm', 'Training', 'Đi ăn'].map((item) => (
                                    <MenuItem key={item} sx={{fontSize: '16px'}} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Tiêu đề */}
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            size="medium"
                            label="Tiêu đề *"
                            sx={{
                                '& .MuiInputBase-input, & .MuiInputLabel-root':{fontSize: '16px'},
                                '& .MuiInputLabel-root': {paddingRight: '5px', backgroundColor: 'white'},
                            }}
                            value={formData.title}
                            onChange={handleChange('title')}
                            placeholder="Nhập tiêu đề"
                        />
                    </Grid>

                    {/* Đối tượng */}
                    <Grid size={6}>
                        <FormControl fullWidth size="medium">
                            <InputLabel 
                            sx={{fontSize: '16px', backgroundColor: 'white', px: 1, py: 0}}
                            >
                                Đối tượng
                            </InputLabel>
                            <Select
                                value={formData.object}
                                label="Đối tượng"
                                onChange={handleChange('object')}
                                sx={{fontSize: '16px',
                                     '& .MuiSelect-icon':{
                                        fontSize: '2.5rem',
                                    }
                                }}
                            >
                                {teachers.map((item) => (
                                    <MenuItem key={item.adminId} sx={{fontSize:'16px'}} value={`Teacher - ${item.fullName}`}>
                                        Teacher - {item.fullName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Người thực hiện */}
                    <Grid size={6}>
                        <FormControl fullWidth size="medium" sx={{
                                '& .MuiInputLabel-root': {paddingRight: '5px', backgroundColor: 'white', fontSize: '16px !important'}
                            }}>
                            <InputLabel>Người thực hiện</InputLabel>
                            <Select
                                value={formData.user}
                                label="Người thực hiện"
                                sx={{
                                    '& .MuiSelect-icon':{
                                        fontSize: '2.5rem',
                                    }
                                }}
                                onChange={handleChange('user')}
                                renderValue={(value) => (
                                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                        <Chip
                                            label={value}
                                            size="medium"
                                            onDelete={() => {}}
                                            sx={{fontSize: '16px'}}
                                            deleteIcon={<X size={16} />}
                                        />
                                    </Box>
                                )}
                            >
                                <MenuItem sx={{fontSize: '16px'}} value="QL-0000001 - Quản Lý">QL-0000001 - Quản Lý</MenuItem>
                                <MenuItem sx={{fontSize: '16px'}} value="NV-0000002 - Nhân viên A">NV-0000002 - Nhân viên A</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Ngày */}
                    <Grid size={4}>
                        <TextField
                            fullWidth
                            size="medium"
                            type="date"
                            label="Ngày"
                            value={formData.date}
                            onChange={handleChange('date')}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                '& .MuiInputBase-input, & .MuiInputLabel-root':{fontSize: '16px'},
                                '& .MuiInputLabel-root': {paddingRight: '5px', backgroundColor: 'white'}
                            }}
                        />
                    </Grid>

                    {/* Giờ bắt đầu */}
                    <Grid size={4}>
                        <TextField
                            fullWidth
                            size="medium"
                            type="time"
                            label="Giờ bắt đầu"
                            sx={{
                                '& .MuiInputBase-input, & .MuiInputLabel-root':{fontSize: '16px'},
                                '& .MuiInputLabel-root': {paddingRight: '5px', backgroundColor: 'white'}
                            }}
                            value={formData.startTime}
                            onChange={handleChange('startTime')}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    {/* Giờ kết thúc */}
                    <Grid size={4}>
                        <TextField
                            fullWidth
                            size="medium"
                            type="time"
                            label="Giờ kết thúc"
                            sx={{
                                '& .MuiInputBase-input, & .MuiInputLabel-root':{fontSize: '16px'},
                                '& .MuiInputLabel-root': {paddingRight: '5px', backgroundColor: 'white'}
                            }}
                            value={formData.endTime}
                            onChange={handleChange('endTime')}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    {/* Mô tả */}
                    <Grid size={12}>
                        <CKEditor
                            editor={ClassicEditor}
                            data={formData.description || "<p>Nhập nội dung tại đây...</p>"}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setFormData(prev => ({
                                    ...prev,
                                    description: data
                                }));
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #e0e0e0' }}>
                <Button 
                    onClick={onClose}
                    variant="outlined"
                    sx={{ textTransform: 'none', fontSize: '16px' }}
                >
                    Hủy
                </Button>
                <Button 
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ 
                        textTransform: 'none',
                        bgcolor: '#1976d2',
                        '&:hover': { bgcolor: '#1565c0' },
                        fontSize: '16px'
                    }}
                >
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default WorkSchedule;