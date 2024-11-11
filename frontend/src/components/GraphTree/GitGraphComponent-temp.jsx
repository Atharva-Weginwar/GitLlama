import React, { useMemo } from 'react';
import { Timeline } from 'antd';
import data from "./commitsfrontend.json";

const GithubBranchComponent = () => {
  // Generate a color based on branch name
  const getBranchColor = (branchName) => {
    // Predefined colors for common branch names
    const commonBranchColors = {
      master: '#94A3B8',
      main: '#94A3B8',
      develop: '#10B981',
      development: '#10B981',
      staging: '#F59E0B',
      production: '#EF4444',
    };

    // Return predefined color if exists
    if (commonBranchColors[branchName.toLowerCase()]) {
      return commonBranchColors[branchName.toLowerCase()];
    }

    // Generate consistent color based on branch name
    let hash = 0;
    for (let i = 0; i < branchName.length; i++) {
      hash = branchName.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Create HSL color with consistent saturation and lightness
    const hue = hash % 360;
    return hsl(${hue}, 70%, 50%);
  };

  // Memoize branch colors to maintain consistency
  const branchColors = useMemo(() => {
    const colors = new Map();
    data.branches.forEach(branch => {
      colors.set(branch.branch, getBranchColor(branch.branch));
    });
    return colors;
  }, []);

  const findMainBranch = (branches) => {
    return branches?.find?.(b => 
      b.branch?.toLowerCase() === 'master' || b.branch?.toLowerCase() === 'main'
    ) || branches?.[0];
  };

  const processCommits = () => {
    const mainBranch = findMainBranch(data.branches);
    const branchCommitIndices = new Map();

    const allCommits = data.branches.flatMap(branchData => 
      branchData.commits.map(commit => ({
        ...commit,
        branch: branchData.branch,
        isMainBranch: branchData.branch === mainBranch?.branch
      }))
    );

    const sortedCommits = allCommits.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );

    sortedCommits.forEach((commit, index) => {
      if (!branchCommitIndices.has(commit.branch)) {
        branchCommitIndices.set(commit.branch, []);
      }
      branchCommitIndices.get(commit.branch).push(index);
    });

    return sortedCommits.map((commit, index) => {
      const isMainBranch = commit.branch === mainBranch?.branch;
      const color = branchColors.get(commit.branch);
      const textColor = isMainBranch ? '#94A3B8' : color;

      const branchIndices = branchCommitIndices.get(commit.branch);
      const currentBranchPosition = branchIndices.indexOf(index);
      const isFirstInBranch = currentBranchPosition === 0;
      const isLastInBranch = currentBranchPosition === branchIndices.length - 1;

      return {
        dot: (
          <div style={{ 
            position: 'relative',
            paddingLeft: isMainBranch ? 0 : '16px'
          }}>
            <div style={{ 
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: isMainBranch ? color : '#1e1e2e',
              border: 1.5px solid ${color},
              position: 'relative',
              zIndex: 2
            }}/>
            {!isMainBranch && (
              <>
                {/* Horizontal connecting line */}
                <div style={{
                  position: 'absolute',
                  width: '16px',
                  borderTop: 1.5px solid ${color},
                  left: '0',
                  top: '3px',
                  zIndex: 1
                }}/>
                
                {/* Vertical line going up (if not first commit) */}
                {!isFirstInBranch && (
                  <div style={{
                    position: 'absolute',
                    width: '1.5px',
                    backgroundColor: color,
                    left: '0',
                    top: '-13px',
                    height: '16px',
                    zIndex: 1
                  }}/>
                )}
                
                {/* Vertical line going down (if not last commit) */}
                {!isLastInBranch && (
                  <div style={{
                    position: 'absolute',
                    width: '1.5px',
                    backgroundColor: color,
                    left: '0',
                    top: '3px',
                    height: '23px',
                    zIndex: 1
                  }}/>
                )}
                
                {/* Branch start curve (only for first commit in branch) */}
                {isFirstInBranch && (
                  <div style={{
                    position: 'absolute',
                    width: '16px',
                    height: '16px',
                    left: '0',
                    top: '-13px',
                    borderLeft: 1.5px solid ${color},
                    borderBottom: 1.5px solid ${color},
                    borderBottomLeftRadius: '8px',
                    zIndex: 1
                  }}/>
                )}
                
                {/* Branch end curve (only for last commit in branch) */}
                {isLastInBranch && (
                  <div style={{
                    position: 'absolute',
                    width: '16px',
                    height: '16px',
                    left: '0',
                    top: '3px',
                    borderLeft: 1.5px solid ${color},
                    borderTop: 1.5px solid ${color},
                    borderTopLeftRadius: '8px',
                    zIndex: 1
                  }}/>
                )}
              </>
            )}
          </div>
        ),
        children: (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            paddingLeft: isMainBranch ? 0 : '16px',
            marginTop: '-2px'
          }}>
            <div style={{
              padding: '1px 6px',
              fontSize: '11px',
              border: 1.5px solid ${color},
              borderRadius: '9999px',
              marginRight: '8px',
              color: textColor,
              backgroundColor: '#1e1e2e',
              fontWeight: 500,
            }}>
              {commit.branch}
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              color: textColor,
              fontSize: '12px',
              fontWeight: 400
            }}>
              <span style={{ 
                fontFamily: 'monospace',
                marginRight: '4px'
              }}>
                {commit.commit_hash?.substring(0, 7)}
              </span>
              <span style={{ color: '#94A3B8' }}>{commit.message}</span>
              <span style={{ color: '#94A3B8' }}>- {commit.author?.name}</span>
            </div>
          </div>
        )
      };
    });
  };

  return (
    <div style={{ 
      height: '100vh', 
      backgroundColor: '#1e1e2e', 
      overflow: 'hidden' 
    }}>
      <div style={{ 
        height: '100%', 
        padding: '24px', 
        overflowY: 'auto' 
      }}>
        <Timeline
          items={processCommits()}
          className="custom-git-timeline"
        />
      </div>
      <style jsx global>{`
        .custom-git-timeline {
          margin: 0;
          padding: 0;
        }
        
        .custom-git-timeline .ant-timeline-item-tail {
          border-left: 1.5px solid #334155;
          left: 2px;
          height: calc(100% + 10px) !important;
          top: 0 !important;
          opacity: 0.4;
        }
        
        .ant-timeline-item {
          margin: 0 !important;
          padding: 0 0 10px 0 !important;
          min-height: 10px !important;
          position: relative;
        }
        
        .ant-timeline-item:last-child {
          padding-bottom: 0 !important;
        }
        
        .ant-timeline-item:last-child .ant-timeline-item-tail {
          display: none;
        }
        
        .ant-timeline-item-head {
          background: transparent !important;
          padding: 0 !important;
          width: 6px !important;
          height: 6px !important;
        }
        
        .ant-timeline-item-content {
          margin: 0 0 0 12px !important;
          padding: 0 !important;
          min-height: 10px !important;
          line-height: 1.2 !important;
        }
      `}</style>
    </div>
  );
};



export default GithubBranchComponent;