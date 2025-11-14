import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCircleCheck, FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';
import { Steps, Card, Row, Col, Input, Button, Typography, Divider, message } from 'antd';

const { Step } = Steps;
const { Title, Text } = Typography;

export default function CheckoutPage() {
    const location = useLocation();
    const { courseData } = location.state || {};

    const [currentStep, setCurrentStep] = useState(0);

    const qrImageUrl = '/images/maQR-student.png';

    function readMoney(number) {
        if (typeof number !== 'number' || isNaN(number)) return '';

        const dv = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ', 'tỷ tỷ'];
        const so = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

        function read3(num) {
            let tr = Math.floor(num / 100);
            let ch = Math.floor((num % 100) / 10);
            let dv = num % 10;
            let result = '';

            if (tr > 0) {
                result += so[tr] + ' trăm';
                if (ch === 0 && dv > 0) result += ' linh';
            }

            if (ch > 1) {
                result += ' ' + so[ch] + ' mươi';
                if (dv === 1) result += ' mốt';
                else if (dv === 5) result += ' lăm';
                else if (dv > 0) result += ' ' + so[dv];
            } else if (ch === 1) {
                result += ' mười';
                if (dv === 1) result += ' một';
                else if (dv > 0) result += ' ' + so[dv];
            } else if (ch === 0 && dv > 0) {
                if (tr > 0) {
                    if (dv === 5) result += ' lăm';
                    else result += ' ' + so[dv];
                } else {
                    result += so[dv];
                }
            }

            return result.trim();
        }

        if (number === 0) return 'không đồng';

        let parts = [];
        let i = 0;
        while (number > 0) {
            let block = number % 1000;
            if (block > 0) {
                let blockText = read3(block);
                if (dv[i]) blockText += ' ' + dv[i];
                parts.unshift(blockText);
            }
            number = Math.floor(number / 1000);
            i++;
        }

        let result = parts.join(' ').trim();
        result = result.charAt(0).toUpperCase() + result.slice(1) + ' đồng';
        return result;
    }

    const handleConfirm = () => {
        setCurrentStep(1);
    };

    const handleNext = () => {
        message.success('Thanh toán được xác nhận!');
        setCurrentStep(2);
    };

    const handleBack = () => {
        setCurrentStep(0);
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '30px 20px' }}>
            <Steps current={currentStep} style={{ marginBottom: 40, fontSize: 16, fontWeight: '500' }}>
                <Step title="Xác nhận thông tin đơn hàng" />
                <Step title="Xác nhận thanh toán" />
                <Step title="Hoàn tất thanh toán" />
            </Steps>
            {currentStep === 0 && (
                <div>
                    <Card style={{ borderRadius: 12 }}>
                        <Title level={4} style={{ fontSize: 24 }}>
                            Khoá học (1)
                        </Title>

                        <Row align="middle" style={{ marginTop: 16 }}>
                            <Col>
                                <Text style={{ color: 'green', fontSize: 18 }}>
                                    <FaCircleCheck />
                                </Text>
                            </Col>
                            <Col style={{ marginLeft: 10 }}>
                                <Text strong style={{ marginTop: 16, fontSize: 18 }}>
                                    {courseData.courseName}
                                </Text>
                            </Col>
                        </Row>

                        <Divider />

                        <Title level={5}>Mã khuyến mãi của bạn</Title>

                        <Row gutter={12} style={{ maxWidth: 400 }}>
                            <Col span={16}>
                                <Input placeholder="Nhập mã khuyến mãi" />
                            </Col>
                            <Col span={8}>
                                <Button type="primary" block>
                                    Áp dụng
                                </Button>
                            </Col>
                        </Row>

                        <Divider />

                        <Row justify="space-between" align="middle">
                            <Text strong style={{ fontSize: 20 }}>
                                Tổng thanh toán
                            </Text>
                            <Text strong style={{ fontSize: 28, color: '#1677ff' }}>
                                {courseData.tutitionFee} VNĐ
                            </Text>
                        </Row>
                        <Row justify="end" style={{ fontSize: 16, marginTop: 8 }}>
                            <Text italic style={{ fontSize: 16 }}>
                                {readMoney(courseData.tutitionFee)}
                            </Text>
                        </Row>
                    </Card>

                    <div style={{ textAlign: 'right', marginTop: 30 }}>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleConfirm}
                            style={{
                                background: '#ff004e',
                                borderColor: '#ff004e',
                                padding: '0 40px',
                                height: 48,
                                borderRadius: 30,
                                fontSize: 16,
                            }}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </div>
            )}

            {currentStep === 1 && (
                <Card style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <Title level={3}>Quét mã QR để thanh toán</Title>

                    <img
                        src={qrImageUrl}
                        alt="QR Code"
                        style={{
                            width: 250,
                            marginTop: 20,
                            border: '1px solid #eee',
                            borderRadius: 12,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    />

                    <Row style={{ marginTop: 40, width: '100%' }} justify="space-between" align="middle">
                        <Col>
                            <Button
                                size="large"
                                onClick={handleBack}
                                style={{
                                    background: '#ffffffff',
                                    borderColor: '#1677ff',
                                    padding: '0 40px',
                                    height: 48,
                                    borderWidth: 2,
                                    borderRadius: 30,
                                    fontSize: 16,
                                }}
                            >
                                <FaArrowLeftLong /> Quay lại
                            </Button>
                        </Col>

                        <Col>
                            <Button
                                size="large"
                                type="primary"
                                onClick={handleNext}
                                style={{
                                    background: '#1677ff',
                                    borderColor: '#1677ff',
                                    padding: '0 40px',
                                    height: 48,
                                    borderRadius: 30,
                                    fontSize: 16,
                                }}
                            >
                                Tiếp tục <FaArrowRightLong />
                            </Button>
                        </Col>
                    </Row>
                </Card>
            )}
            {currentStep === 2 && (
                <Card style={{ textAlign: 'center', padding: '50px 20px' }}>
                    <FaCircleCheck size={72} color="#52c41a" style={{ margin: 'auto' }} />
                    <Title level={3} style={{ marginTop: 20, fontSize: 24 }}>
                        Thanh toán thành công!
                    </Title>
                    <Text style={{ fontSize: 16 }}>Cảm ơn bạn đã đăng ký khóa học.</Text>
                </Card>
            )}
        </div>
    );
}
