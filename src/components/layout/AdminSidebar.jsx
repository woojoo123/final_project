import React, { useState } from 'react';
import {
  Home, FileText, ShoppingCart, Package, RefreshCw,
  Users, Bell, Megaphone, BarChart3, Menu,
  ChevronDown, ChevronRight,
  ChevronsLeft, ChevronsRight
} from 'lucide-react';
import './AdminSidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    groupbuy: false, 
    member: false,
    stats: false
  });

  const toggleSubmenu = (menuId) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>

      {/* 헤더 */}
      <div className="sidebar-header">
        <div className="logo-container">
          {!isCollapsed && (
            <div className="logo">
              <span className="logo-icon" ><img src="/logo.svg" width="60px"/></span>
              <span className="logo-text">JOINus</span>
            </div>
          )}
          {isCollapsed && (
            <div className="logo-icon-only"> </div>
          )}
        </div>
        <button 
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? 
            <ChevronsRight size={20} /> : 
            <ChevronsLeft size={20} />
          }
        </button>
      </div>

      {/* 메뉴 리스트 */}
      <nav className="sidebar-nav">
        
        {/* 홈 */}
        <div className="menu-item-container">
          <div className="menu-item active">
            <div className="menu-item-content">
              <Home size={20} className="menu-icon" />
              {!isCollapsed && <span className="menu-label">홈</span>}
            </div>
          </div>
        </div>

        {/* 제안관리 */}
        <div className="menu-item-container">
          <div className="menu-item">
            <div className="menu-item-content">
              <FileText size={20} className="menu-icon" />
              {!isCollapsed && <span className="menu-label">제안관리</span>}
            </div>
          </div>
        </div>

        {/* 공구 관리 (서브메뉴) */}
        <div className="menu-item-container">
          <div 
            className="menu-item"
            onClick={() => toggleSubmenu('groupbuy')}
          >
            <div className="menu-item-content">
              <ShoppingCart size={20} className="menu-icon" />
              {!isCollapsed && (
                <>
                  <span className="menu-label">공구 관리</span>
                  <span className="menu-arrow">
                    {openMenus.groupbuy ? 
                      <ChevronDown size={16} /> : 
                      <ChevronRight size={16} />
                    }
                  </span>
                </>
              )}
            </div>
          </div>
          
          {/* 서브메뉴 */}
          {openMenus.groupbuy && !isCollapsed && (
            <div className="submenu">
              <div className="submenu-item">
                <span className="submenu-label">공구 목록 조회</span>
              </div>
              <div className="submenu-item">
                <span className="submenu-label">공구 상품 주문/배송 관리</span>
              </div>
            </div>
          )}
        </div>

        {/* 교환 및 반품 관리 */}
        <div className="menu-item-container">
          <div className="menu-item" >
            <div className="menu-item-content">
              <RefreshCw size={20} className="menu-icon" />
              {!isCollapsed && <span className="menu-label">교환 및 반품 관리</span>}
            </div>
          </div>
        </div>

        {/* 회원 관리 (서브메뉴)  */}
        <div className="menu-item-container">
          <div className="menu-item"
          onClick={() => toggleSubmenu('member')}
          >
            <div className="menu-item-content">
              <Users size={20} className="menu-icon" />
              {!isCollapsed && (
                <>
                  <span className="menu-label">회원 관리</span>
                  <span className="menu-arrow">
                    {openMenus.member ? 
                      <ChevronDown size={16} /> : 
                      <ChevronRight size={16} />
                    }
                  </span>
                </>
              )}
            </div>
          </div>
          
          {openMenus.member && !isCollapsed && (
            <div className="submenu">
              <div className="submenu-item">
                <span className="submenu-label">공지사항</span>
              </div>
              <div className="submenu-item">
                <span className="submenu-label">FAQ</span>
              </div>
              <div className="submenu-item">
                <span className="submenu-label">1:1 문의</span>
              </div>
            </div>
          )}
        </div>

        {/* 알림 */}
        <div className="menu-item-container">
          <div className="menu-item">
            <div className="menu-item-content">
              <Bell size={20} className="menu-icon" />
              {!isCollapsed && <span className="menu-label">알림발송</span>}
            </div>
          </div>
        </div>

        {/* 통계 (서브메뉴) */}
        <div className="menu-item-container">
          <div 
            className="menu-item"
            onClick={() => toggleSubmenu('stats')}
          >
            <div className="menu-item-content">
              <BarChart3 size={20} className="menu-icon" />
              {!isCollapsed && (
                <>
                  <span className="menu-label">통계</span>
                  <span className="menu-arrow">
                    {openMenus.stats ? 
                      <ChevronDown size={16} /> : 
                      <ChevronRight size={16} />
                    }
                  </span>
                </>
              )}
            </div>
          </div>

          {openMenus.stats && !isCollapsed && (
            <div className="submenu">
              <div className="submenu-item">
                <span className="submenu-label">매출통계</span>
              </div>
              <div className="submenu-item">
                <span className="submenu-label">상품별 통계</span>
              </div>
            </div>
          )}

        </div>

      </nav>
    </div>
  );
};

export default Sidebar;