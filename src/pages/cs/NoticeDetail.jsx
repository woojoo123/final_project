import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './NoticeDetail.css';

export default function NoticeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      setIsLoading(true);
      try {
        // TODO: 백엔드 연동 시 아래 주석 해제
        // const baseUrl = 'http://localhost:8080';
        // const response = await fetch(`${baseUrl}/notice/${id}`);
        // const data = await response.json();
        // setNotice(data);

        // 임시: 더미 데이터 (백엔드 연동 전까지)
        const dummyNotice = {
          id: parseInt(id),
          title: 'CJONE 포인트 적립 시 유의사항 안내',
          content: `안녕하세요, 공구멤버입니다.
공동구매 구매 시 CJ ONE 포인트 적립 가능 상품 이용 시에는 아래와같이, 확인 단계별 서비스 이용을 위해 약관 내용을 꼭 확인해 주세요.`,
          images: [
            { url: '/images/notice1.jpg', name: '공지 이미지 1' },
            { url: '/images/notice2.jpg', name: '공지 이미지 2' },
          ],
          created_at: '2025-11-20',
        };
        setNotice(dummyNotice);
      } catch (error) {
        console.error('공지사항 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotice();
  }, [id]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!notice) return <div>공지사항을 찾을 수 없습니다.</div>;

  return (
    <div className="notice-detail-page">
      <div className="notice-detail-container">
        {/* 헤더 */}
        <div className="detail-header">
          <h1 className="page-title">공지사항</h1>
          <button className="back-button" onClick={() => navigate('/cs/notice')}>
            ← 뒤로가기
          </button>
        </div>

        {/* 공지사항 등록 폼 내용 (읽기 전용) */}
        <div className="notice-form-section">
          <h2 className="section-title">공지사항 내용</h2>
          
          <div className="form-group-readonly">
            <label className="form-label">제목</label>
            <div className="form-value">{notice.title}</div>
          </div>

          <div className="form-group-readonly">
            <label className="form-label">본문</label>
            <div className="form-value content-value">{notice.content}</div>
          </div>

          {notice.images && notice.images.length > 0 && (
            <div className="form-group-readonly">
              <label className="form-label">이미지 첨부</label>
              <div className="image-list">
                {notice.images.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.url} alt={image.name || `이미지 ${index + 1}`} />
                    <span className="image-name">{image.name || `이미지 ${index + 1}`}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 공지 목록 버튼 */}
        <div className="detail-footer">
          <button className="list-button" onClick={() => navigate('/cs/notice')}>
            공지 목록
          </button>
        </div>
      </div>
    </div>
  );
}