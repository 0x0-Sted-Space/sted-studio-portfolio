'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Avatar, Heading, Tag } from '@/once-ui/components';

const initialProfiles = [
  { name: 'The Boys', avatar: '/images/theboys.jpg', tags: [], skills: [], profile: '#', github: '#', x: 120, y: 430 },
  { name: 'Dyno', avatar: '/images/gallery/img-08.jpg', tags: ['Ex Amazon', 'Canada', 'Marketing Expert', 'Stylist', 'Fashion Model'], skills: [], profile: '#', github: '#', x: 265, y: 300 },
  { name: 'HK', avatar: '/images/gallery/img-01.jpg', tags: ['Production Engineer', 'Script Writing', 'Digital Marketing with GEN AI', 'Front End Dev', 'Gen AI'], skills: ['React', 'Node.js', 'APIs'], profile: '#', github: '#', x: 420, y: 245 },
  { name: 'SK', avatar: '/images/projects/project-01/avatar-05.png', tags: ['Audio Engineer', 'Digital Marketing with GEN AI', 'Front End Dev', 'Gen AI', 'Web 3'], skills: ['Leadership', 'Strategy', 'Growth'], profile: '#', github: '#', x: 580, y: 320 },
  { name: 'Dutt', avatar: '/images/gallery/img-07.jpg', tags: ['Automation & Testing Expert'], skills: ['AWS', 'Docker', 'K8s'], profile: '#', github: '#', x: 550, y: 170 },
  { name: 'Ram', avatar: '/images/gallery/img-04.jpg', tags: ['Mechanist', 'ALL INDIA GATE 500', 'Nuclear Scientist at Kundakulm Nuclear Plant', 'Drone Specialist', 'IIT Madras Dropout'], skills: ['Node.js', 'Express', 'DB'], profile: '#', github: '#', x: 750, y: 165 },
  { name: 'Avi', avatar: '/images/gallery/img-14.jpg', tags: ['Marketing', 'Business Dev', 'Culinary Specialist'], skills: [], profile: '#', github: '#', x: 900, y: 240 },
  { name: 'Hari', avatar: '/images/gallery/img-06.jpg', tags: ['Hardware Expert', 'Newzealand'], skills: ['Testing', 'Automation', 'Cypress'], profile: '#', github: '#', x: 1000, y: 155 },
  { name: 'Loki jr', avatar: '/images/gallery/img-05.jpg', tags: ['Drone Flight and Maintenance Expert', 'Production Specialist', 'Photo & Videography'], skills: ['React', 'CSS', 'UX'], profile: '#', github: '#', x: 1090, y: 270 },
  { name: 'Gopal', avatar: '/images/gallery/img-11.jpg', tags: ['Marketing & PR'], skills: [], profile: '#', github: '#', x: 1150, y: 432 },
  { name: 'Bhargav', avatar: '/images/gallery/img-03.jpg', tags: ['Product Management', 'Full Stack Dev', 'AI & ML'], skills: ['Research', 'Tech Writing', 'Docs'], profile: '#', github: '#', x: 1005, y: 435 },
  { name: 'Bharat', avatar: '/images/gallery/img-02.jpg', tags: ['AI & ML', 'Product Management', 'Full Stack Dev'], skills: ['Python', 'ML', 'Data'], profile: '#', github: '#', x: 985, y: 570 },
  { name: 'Veda Vyas', avatar: '/images/gallery/img-10.jpg', tags: ['Interning'], skills: [], profile: '#', github: '#', x: 1140, y: 595 },
  { name: 'Hruday', avatar: '/images/gallery/img-09.jpg', tags: ['CX Expert', 'Design Mughal', 'Web 3', 'Architect'], skills: [], profile: '#', github: '#', x: 810, y: 600 },
  { name: 'Joy', avatar: '/images/gallery/img-14.jpg', tags: ['AAA rated game dev', 'Bangalore', 'Metaverse expert'], skills: [], profile: '#', github: '#', x: 600, y: 645 },
  { name: 'Shiva (London)', avatar: '/images/gallery/img-13.jpg', tags: ['Game Design', 'AR/VR & Metaverse expert', 'London'], skills: [], profile: '#', github: '#', x: 460, y: 580 },
  { name: 'Subhash', avatar: '/images/gallery/img-12.jpg', tags: ['Product Guy', 'Bangalore', 'Gen AI', 'Full Stack Mechanist', 'Full Stack Dev'], skills: [], profile: '#', github: '#', x: 430, y: 420 },
  { name: 'Nakamoto', avatar: '/images/gallery/img-01.jpg', tags: ['Full Stack Dev', 'Agents', 'Gen AI', 'Web 3', 'Metaverse'], skills: ['Bitcoin', 'Crypto', 'Security'], profile: 'https://en.wikipedia.org/wiki/Satoshi_Nakamoto', github: 'https://github.com/satoshin', x: 580, y: 480 },
  { name: 'Chan', avatar: '/images/projects/project-01/avatar-03.png', tags: ['Full Stack Dev', 'Agents', 'Gen AI', 'Web 3', 'Metaverse'], skills: ['UI/UX', 'Branding', 'Web'], profile: '#', github: '#', x: 715, y: 480 },
  { name: 'Shiva', avatar: '/images/profiles/shiva.png', tags: ['Maker', 'Agents', 'Gen AI', 'Web 3', 'Metaverse'], skills: ['Next.js', 'Figma', 'AI'], profile: 'https://www.linkedin.com/in/shiva-karan/', github: 'https://github.com/shiva-karan-k', x: 760, y: 330 },
  { name: 'Loki', avatar: '/images/projects/project-01/avatar-04.png', tags: ['Digital Marketing with GEN AI', 'Front End Dev', 'Gen AI', 'Web 3'], skills: ['DevOps', 'Cloud', 'Automation'], profile: '#', github: '#', x: 870, y: 425 },
  { name: 'Abhimanyu', avatar: '/images/gallery/img-12.jpg', tags: ['Business Dev', 'Investor Connections'], skills: [], profile: '#', github: '#', x: 280, y: 560 },
];

// Add a mobile detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 700 : false
  );
  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth <= 700);
    }
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function ProfileTeamSection() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [hoveredAvatarIdx, setHoveredAvatarIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const avatarRadius = 36;

  // --- DRAGGABLE STATE ---
  const centerX = 700;
  const centerY = 400;
  const a = 350;
  const b = 200;
  const designWidth = 1400;
  const [scale, setScale] = useState(1);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{x: number, y: number}>({x: 0, y: 0});

  // Drag handlers
  const handleMouseDown = (idx: number, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggingIdx(idx);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (draggingIdx !== null && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;
      setProfiles(profiles =>
        profiles.map((profile, idx) =>
          idx === draggingIdx ? { ...profile, x, y } : profile
        )
      );
    }
  };
  const handleMouseUp = () => {
    setDraggingIdx(null);
  };
  useEffect(() => {
    if (draggingIdx !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  });

  useEffect(() => {
    function updateScale() {
      const w = window.innerWidth;
      setScale(Math.min(1, w / designWidth));
    }
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Card popup position logic
  const getAvatarPosition = (idx: number) => {
    const avatar = document.getElementById(`team-avatar-${idx}`);
    if (!avatar || !containerRef.current) return { left: 0, top: 0 };
    const avatarRect = avatar.getBoundingClientRect?.();
    const containerRect = containerRef.current.getBoundingClientRect?.();
    if (!avatarRect || !containerRect) return { left: 0, top: 0 };
    return {
      left: avatarRect.left - containerRect.left + avatarRect.width + 12,
      top: avatarRect.top - containerRect.top,
    };
  };

  const isMobile = useIsMobile();

  return (
    <>
      <style>{`
        .team-fabric-container {
          width: 100vw;
          max-width: 100vw;
          min-height: 900px;
          height: 900px;
          margin: 0 auto;
          overflow-x: hidden;
          overflow-y: visible;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .team-fabric-logo-row {
          position: absolute;
          left: 32px;
          top: 280px;
          transform: none;
          width: auto;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          z-index: 20;
          margin: 0;
          padding: 0;
        }
        .team-fabric-logo {
          width: 180px;
          height: 110px;
          border-radius: 16px;
          object-fit: cover;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
          background: #000;
          display: block;
          transform: rotate(-6deg);
        }
        .team-fabric-grid {
          width: 100%;
          position: relative;
          min-height: 900px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .team-fabric-avatar {
          position: absolute;
          transition: box-shadow 0.2s, transform 0.2s;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
        }
        .team-fabric-avatar.hovered, .team-fabric-avatar.dragging {
          /* Remove glowing box-shadow */
          transform: scale(1.08);
          z-index: 9999;
        }
        .team-fabric-avatar.wiggle {
          animation: wiggle 0.4s infinite alternate;
        }
        @keyframes wiggle {
          0% { transform: rotate(-4deg) scale(1.04); }
          100% { transform: rotate(4deg) scale(1.08); }
        }
        .team-fabric-name {
          font-size: 11px;
          color: #fff;
          margin-top: 4px;
          text-align: center;
          font-weight: 500;
          text-shadow: 0 1px 4px rgba(0,0,0,0.18);
        }
        .team-fabric-tag {
          position: absolute;
          color: #222;
          font-size: 12px;
          max-width: 120px;
          white-space: pre-line;
          word-break: break-word;
          background: none;
          border-radius: 6px;
          padding: 2px 8px;
          box-shadow: none;
          z-index: 10;
          pointer-events: auto;
          transition: color 0.2s, text-shadow 0.2s, background 0.2s, opacity 0.2s;
          line-height: 1.4;
          opacity: 0;
          pointer-events: none;
        }
        .team-fabric-avatar.hovered .team-fabric-tag,
        .team-fabric-avatar.dragging .team-fabric-tag {
          opacity: 1;
          pointer-events: auto;
        }
        .team-fabric-tag.glow {
          color: #fff;
          text-shadow: 0 0 8px #fff, 0 0 2px #00e0ff;
        }
        .team-fabric-tag-line {
          position: absolute;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .team-fabric-avatar.hovered .team-fabric-tag-line,
        .team-fabric-avatar.dragging .team-fabric-tag-line {
          opacity: 1;
        }
        .team-fabric-popup {
          position: absolute;
          background: #222;
          color: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          padding: 20px 28px;
          min-width: 220px;
          z-index: 10;
          animation: fadeIn 0.2s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .team-fabric-title {
          position: absolute;
          left: 50%;
          top: 48%;
          transform: translate(-50%, -50%);
          z-index: 5;
          color: #fff;
          font-size: 2.2rem;
          font-weight: 700;
          text-align: center;
          text-shadow: 0 2px 16px #000, 0 0 2px #fff;
          pointer-events: none;
          letter-spacing: 0.04em;
          user-select: none;
        }
        @media (max-width: 700px) {
          .team-fabric-container {
            align-items: center;
            justify-content: flex-start;
          }
          .team-fabric-logo-row {
            position: static;
            left: unset;
            top: unset;
            transform: none;
            margin-top: 32px;
            margin-bottom: 32px;
            justify-content: center;
            margin-left: 0;
          }
          .team-fabric-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 32px 16px;
            position: static;
            min-height: unset;
          }
          .team-fabric-avatar {
            position: static;
            margin: 0 auto;
            left: unset;
            top: unset;
            transform: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: none;
            border: none;
            box-shadow: none;
            z-index: 1;
            width: auto;
            min-width: 0;
          }
          .team-fabric-tag, .team-fabric-tag-line {
            display: none;
          }
          .team-fabric-avatar .team-fabric-tags-mobile {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 6px;
            gap: 4px;
          }
          .team-fabric-avatar .team-fabric-tags-mobile span {
            background: #f5f5f5;
            color: #222;
            font-size: 10px;
            border-radius: 6px;
            padding: 2px 8px;
            box-shadow: none;
            text-align: center;
            white-space: normal;
            margin: 0;
          }
        }
      `}</style>
      <div className="team-fabric-container" ref={containerRef}>
        <div className="team-fabric-logo-row" style={isMobile ? { position: 'static', left: undefined, top: undefined, transform: 'none', justifyContent: 'center', marginTop: 32, marginBottom: 32, marginLeft: 0, width: '100%' } : {}}>
          <img src="/images/theboys.jpg" alt="The Boys" className="team-fabric-logo" />
        </div>
        <div className="team-fabric-grid" style={isMobile ? { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '32px 16px', position: 'static', minHeight: undefined } : {}}>
          {profiles.filter(p => p.name !== 'The Boys').map((profile, idx) => {
            const { x, y } = profile;
            let avatarSrc = profile.avatar;
            const containerSize = 220;
            const center = containerSize / 2;
            const isHovered = hoveredAvatarIdx === idx;
            const isDragging = draggingIdx === idx;
            return (
              <div
                key={profile.name + idx}
                className={`team-fabric-avatar${isDragging ? ' dragging' : isHovered ? ' hovered' : ''}`}
                style={isMobile ? {
                  position: 'static',
                  margin: '0 auto',
                  left: undefined,
                  top: undefined,
                  transform: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  boxShadow: 'none',
                  zIndex: 1,
                  width: 'auto',
                  minWidth: 0,
                } : {
                  position: 'absolute',
                  left: x * scale - center,
                  top: y * scale - center,
                  width: containerSize,
                  height: containerSize,
                  zIndex: isDragging ? 9999 : isHovered ? 98 : 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={() => setHoveredAvatarIdx(idx)}
                onMouseLeave={() => setHoveredAvatarIdx(null)}
                onMouseDown={e => handleMouseDown(idx, e)}
                onClick={() => setActiveIdx(idx)}
                id={`team-avatar-${idx}`}
              >
                {/* Always render Avatar icon for both desktop and mobile */}
                <Avatar src={avatarSrc} size="l" style={{
                  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                  transform: (isDragging || isHovered) ? 'scale(1.08)' : 'scale(1)',
                  zIndex: 20,
                  position: 'relative',
                }} />
                {/* Desktop tags: show tags and tag lines around avatar on hover/drag only */}
                {!isMobile && profile.tags && profile.tags.length > 0 && (
                  <>
                    {profile.tags.map((tag, tIdx) => {
                      const tagCount = profile.tags.length;
                      const tagRadius = 80;
                      const angle = (2 * Math.PI / tagCount) * tIdx - Math.PI / 2;
                      const tagX = center + tagRadius * Math.cos(angle);
                      const tagY = center + tagRadius * Math.sin(angle);
                      // Line from avatar center to tag
                      const lineX1 = center;
                      const lineY1 = center;
                      const lineX2 = tagX;
                      const lineY2 = tagY;
                      // Effects
                      const tagFontSize = tag.length > 16 ? '10px' : '11px';
                      const visible = isHovered || isDragging;
                      return (
                        <React.Fragment key={tag + tIdx}>
                          <svg
                            className="team-fabric-tag-line"
                            style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', opacity: visible ? 1 : 0, transition: 'opacity 0.2s' }}
                            width={containerSize}
                            height={containerSize}
                          >
                            <line
                              x1={lineX1}
                              y1={lineY1}
                              x2={lineX2}
                              y2={lineY2}
                              stroke="#444"
                              strokeWidth="1"
                              strokeDasharray="4 3"
                            />
                          </svg>
                          <div
                            className={`team-fabric-tag${visible ? ' glow' : ''}`}
                            style={{
                              position: 'absolute',
                              left: tagX - 40,
                              top: tagY - 12,
                              fontSize: tagFontSize,
                              color: '#222',
                              padding: '2px 8px',
                              borderRadius: 6,
                              boxShadow: 'none',
                              textAlign: 'center',
                              whiteSpace: 'normal',
                              zIndex: 10,
                              background: '#f5f5f5',
                              opacity: visible ? 1 : 0,
                              pointerEvents: visible ? 'auto' : 'none',
                              transition: 'opacity 0.2s',
                            }}
                          >
                            {tag}
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </>
                )}
                {/* Mobile tags (below name) */}
                {isMobile && profile.tags && profile.tags.length > 0 && (
                  <div className="team-fabric-tags-mobile">
                    {profile.tags.map((tag, tIdx) => (
                      <span key={tag + tIdx}>{tag}</span>
                    ))}
                  </div>
                )}
                {/* Always render name below avatar */}
                <span className="team-fabric-name">{profile.name}</span>
              </div>
            );
          })}
        </div>
        {/* Popup card */}
        {activeIdx !== null && (
          (() => {
            const pos = getAvatarPosition(activeIdx);
            const profile = profiles[activeIdx];
            return (
              <div
                className="team-fabric-popup"
                style={{ left: pos.left, top: pos.top }}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                  <Avatar src={profile.avatar} size="l" style={{ marginRight: 12 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>{profile.name}</div>
                    <div style={{ fontSize: 13, color: '#bbb' }}>{profile.skills.join(', ')}</div>
                  </div>
                </div>
                <div style={{ marginBottom: 8 }}>
                  {profile.tags.map((tag, i) => (
                    <span key={i} style={{
                      display: 'inline-block',
                      background: '#ececec',
                      color: '#888',
                      borderRadius: 12,
                      padding: '2px 10px',
                      fontSize: 12,
                      margin: '0 4px 4px 0',
                    }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: '#aaa', marginBottom: 8 }}>{profile.profile}</div>
                <button
                  style={{
                    background: 'none',
                    border: '1px solid #444',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '4px 12px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setActiveIdx(null)}
                >
                  Close
                </button>
              </div>
            );
          })()
        )}
        {/* Dismiss popup on background click */}
        <div
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
          onClick={() => setActiveIdx(null)}
        />
      </div>
    </>
  );
} 