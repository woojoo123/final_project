import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryApplicationList.css';

export default function DeliveryApplicationList() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('전체'); // 전체, 신청, 승인, 반려

  // 더미 데이터
  const dummyApplications = [
    {
      id: 1,
      companyName: '친환경용품 상사',
      businessNumber: '123-45-67890',
      manager: '김지연',
      email: 'eco@example.com',
      phone: '010-1111-2222',
      category: '생활용품',
      appliedDate: '2025-01-15',
      status: '신청',
      formData: {
        companyName: '친환경용품 상사',
        businessNumber: '123-45-67890',
        manager: '김지연',
        email: 'eco@example.com',
        phone: '010-1111-2222',
        address: '서울시 강남구',
        category: '생활용품',
        description: '친환경 생활용품 전문 납품 업체입니다.'
      }
    },
    {
      id: 2,
      companyName: '해외직구 트레이딩',
      businessNumber: '234-56-78901',
      manager: '박서윤',
      email: 'global@example.com',
      phone: '010-2222-3333',
      category: '가전/기타',
      appliedDate: '2025-01-14',
      status: '승인',
      formData: {
        companyName: '해외직구 트레이딩',
        businessNumber: '234-56-78901',
        manager: '박서윤',
        email: 'global@example.com',
        phone: '010-2222-3333',
        address: '서울시 서초구',
        category: '가전/기타',
        description: '해외 직구 상품 납품 전문'
      }
    },
    {
      id: 3,
      companyName: '주방용품 전문',
      businessNumber: '456-78-90123',
      manager: '최민수',
      email: 'kitchen@example.com',
      phone: '010-4444-5555',
      category: '주방/식기',
      appliedDate: '2025-01-13',
      status: '반려',
      rejectionReason: '필수 서류 미비',
      formData: {
        companyName: '주방용품 전문',
        businessNumber: '456-78-90123',
        manager: '최민수',
        email: 'kitchen@example.com',
        phone: '010-4444-5555',
        address: '서울시 마포구',
        category: '주방/식기',
        description: '주방용품 전문 납품'
      }
    },
  ];

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        // TODO: 백엔드 연동
        // const response = await fetch(`${baseUrl}/admin/delivery-applications?status=${filter}`);
        // const data = await response.json();
        // setApplications(data.items || []);

        // 임시: 더미 데이터 필터링
        const filtered = filter === '전체' 
          ? dummyApplications 
          : dummyApplications.filter(item => item.status === filter);
        setApplications(filtered);
      } catch (error) {
        console.error('신청 목록 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [filter]);

  const handleApprove = async (id) => {
    try {
      // TODO: 백엔드 API 호출
      // await fetch(`${baseUrl}/admin/delivery-applications/${id}/approve`, { method: 'POST' });
      
      alert('승인 처리되었습니다.');
      setApplications(prev => prev.map(item => 
        item.id === id ? { ...item, status: '승인' } : item
      ));
    } catch (error) {
      console.error('승인 처리 실패:', error);
      alert('승인 처리에 실패했습니다.');
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('반려 사유를 입력하세요:');
    if (!reason) return;

    try {
      // TODO: 백엔드 API 호출
      // await fetch(`${baseUrl}/admin/delivery-applications/${id}/reject`, {
      //   method: 'POST',
      //   body: JSON.stringify({ reason })
      // });
      
      alert('반려 처리되었습니다. 업체에 이메일로 전송됩니다.');
      setApplications(prev => prev.map(item => 
        item.id === id ? { ...item, status: '반려', rejectionReason: reason } : item
      ));
    } catch (error) {
      console.error('반려 처리 실패:', error);
      alert('반려 처리에 실패했습니다.');
    }
  };

  const handleDetailClick = (id) => {
    navigate(`/admin/delivery/application/${id}`);
  };

  return (
    <div className="delivery-application-list-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">납품 업체 신청 목록</h1>
          <p className="page-description">
            납품 업체 신청을 확인하고 승인/반려 처리합니다.
          </p>
        </div>
      </div>

      {/* 필터 */}
      <div className="filter-section">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === '전체' ? 'active' : ''}`}
            onClick={() => setFilter('전체')}
          >
            전체
          </button>
          <button
            className={`filter-btn ${filter === '신청' ? 'active' : ''}`}
            onClick={() => setFilter('신청')}
          >
            신청
          </button>
          <button
            className={`filter-btn ${filter === '승인' ? 'active' : ''}`}
            onClick={() => setFilter('승인')}
          >
            승인
          </button>
          <button
            className={`filter-btn ${filter === '반려' ? 'active' : ''}`}
            onClick={() => setFilter('반려')}
          >
            반려
          </button>
        </div>
      </div>

      {/* 목록 테이블 */}
      <div className="list-section">
        {isLoading ? (
          <div className="loading">로딩 중...</div>
        ) : (
          <div className="table-container">
            <table className="application-table">
              <thead>
                <tr>
                  <th>업체명</th>
                  <th>사업자 번호</th>
                  <th>담당자</th>
                  <th>이메일</th>
                  <th>연락처</th>
                  <th>카테고리</th>
                  <th>신청일</th>
                  <th>상태</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="no-data">
                      신청 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  applications.map((item) => (
                    <tr key={item.id}>
                      <td className="company-name">
                        <a
                          href={`/admin/delivery/application/${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleDetailClick(item.id);
                          }}
                        >
                          {item.companyName}
                        </a>
                      </td>
                      <td>{item.businessNumber}</td>
                      <td>{item.manager}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.category}</td>
                      <td>{item.appliedDate}</td>
                      <td>
                        <span className={`status-badge ${item.status === '승인' ? 'approved' : item.status === '반려' ? 'rejected' : 'pending'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        {item.status === '신청' && (
                          <div className="action-buttons">
                            <button
                              className="btn-approve"
                              onClick={() => handleApprove(item.id)}
                            >
                              승인
                            </button>
                            <button
                              className="btn-reject"
                              onClick={() => handleReject(item.id)}
                            >
                              반려
                            </button>
                          </div>
                        )}
                        {item.status === '반려' && (
                          <span className="rejection-reason">{item.rejectionReason}</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}