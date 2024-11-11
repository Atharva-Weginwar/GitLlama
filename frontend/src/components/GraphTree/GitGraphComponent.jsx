// // import React from 'react';
// // import { Timeline } from 'antd';
// // import data from "./commitsfrontend.json";

// // const GithubBranchComponent = () => {
// //   const findMainBranch = (branches) => {
// //     return branches?.find?.(b => 
// //       b.branch?.toLowerCase() === 'master' || b.branch?.toLowerCase() === 'main'
// //     ) || branches?.[0];
// //   };

// //   const processCommits = () => {
// //     const mainBranch = findMainBranch(data.branches);
// //     const items = [];
// //     let branchStarted = false;

// //     // Process main branch first
// //     mainBranch?.commits.forEach((commit, index) => {
// //       const isBranchPoint = !branchStarted && index > 0; // Point where branch starts
// //       const isMergePoint = branchStarted; // Point where branch merges back

// //       items.push({
// //         dot: (
// //           <div style={{ position: 'relative' }}>
// //             <div style={{ 
// //               width: '6px',
// //               height: '6px',
// //               borderRadius: '50%',
// //               backgroundColor: isMergePoint ? 'white' : '#8c8c8c',
// //               border: '1px solid #8c8c8c',
// //             }}/>
// //             {(isBranchPoint || isMergePoint) && (
// //               <div style={{
// //                 position: 'absolute',
// //                 width: '16px',
// //                 height: '16px',
// //                 right: '-16px',
// //                 top: '3px',
// //                 borderTop: '1px solid #1890ff',
// //                 borderRight: isBranchPoint ? '1px solid #1890ff' : 'none',
// //                 borderBottom: isMergePoint ? '1px solid #1890ff' : 'none',
// //                 borderTopRightRadius: isBranchPoint ? '8px' : '0',
// //                 borderBottomRightRadius: isMergePoint ? '8px' : '0'
// //               }}/>
// //             )}
// //           </div>
// //         ),
// //         children: (
// //           <div style={{ display: 'flex', alignItems: 'center' }}>
// //             <div style={{
// //               padding: '0 4px',
// //               fontSize: '10px',
// //               border: '1px solid #8c8c8c',
// //               borderRadius: '9999px',
// //               marginRight: '6px',
// //               color: '#8c8c8c',
// //               lineHeight: '12px'
// //             }}>
// //               master
// //             </div>
// //             <div style={{ 
// //               display: 'flex', 
// //               alignItems: 'center', 
// //               gap: '4px',
// //               color: '#d1d5db',
// //               fontSize: '11px',
// //               lineHeight: '12px'
// //             }}>
// //               <span style={{ fontFamily: 'monospace' }}>
// //                 {commit.commit_hash?.substring(0, 7)}
// //               </span>
// //               <span>{commit.message}</span>
// //               <span>- {commit.author?.name}</span>
// //               {commit.tag && (
// //                 <div style={{
// //                   padding: '0 4px',
// //                   backgroundColor: '#374151',
// //                   fontSize: '10px',
// //                   borderRadius: '2px',
// //                   color: '#d1d5db'
// //                 }}>
// //                   {commit.tag}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )
// //       });

// //       // Insert feature branch commits after branch point
// //       if (isBranchPoint) {
// //         branchStarted = true;
// //         // Add feature branch commits
// //         data.branches.forEach(branchData => {
// //           if (branchData.branch !== mainBranch.branch) {
// //             branchData.commits.forEach(branchCommit => {
// //               items.push({
// //                 dot: (
// //                   <div style={{ position: 'relative' }}>
// //                     <div style={{ 
// //                       width: '6px',
// //                       height: '6px',
// //                       borderRadius: '50%',
// //                       backgroundColor: '#1890ff',
// //                       border: '1px solid #1890ff',
// //                       marginLeft: '16px'
// //                     }}/>
// //                   </div>
// //                 ),
// //                 children: (
// //                   <div style={{ 
// //                     display: 'flex', 
// //                     alignItems: 'center',
// //                     marginLeft: '32px'
// //                   }}>
// //                     <div style={{
// //                       padding: '0 4px',
// //                       fontSize: '10px',
// //                       border: '1px solid #1890ff',
// //                       borderRadius: '9999px',
// //                       marginRight: '6px',
// //                       color: '#1890ff',
// //                       lineHeight: '12px'
// //                     }}>
// //                       {branchData.branch}
// //                     </div>
// //                     <div style={{ 
// //                       display: 'flex', 
// //                       alignItems: 'center', 
// //                       gap: '4px',
// //                       color: '#d1d5db',
// //                       fontSize: '11px',
// //                       lineHeight: '12px'
// //                     }}>
// //                       <span style={{ fontFamily: 'monospace' }}>
// //                         {branchCommit.commit_hash?.substring(0, 7)}
// //                       </span>
// //                       <span>{branchCommit.message}</span>
// //                       <span>- {branchCommit.author?.name}</span>
// //                     </div>
// //                   </div>
// //                 )
// //               });
// //             });
// //           }
// //         });
// //       }
// //     });

// //     return items;
// //   };

// //   return (
// //     <div style={{ 
// //       height: '100vh', 
// //       backgroundColor: '#1e1e2e', 
// //       overflow: 'hidden' 
// //     }}>
// //       <div style={{ 
// //         height: '100%', 
// //         padding: '16px', 
// //         overflowY: 'auto' 
// //       }}>
// //         <Timeline
// //           items={processCommits()}
// //           className="custom-git-timeline"
// //         />
// //       </div>
// //       <style jsx global>{`
// //         .custom-git-timeline {
// //           margin: 0;
// //           padding: 0;
// //         }
        
// //         .custom-git-timeline .ant-timeline-item-tail {
// //           border-left: 1px solid #4a4a57;
// //           left: 2px;
// //           height: calc(100% + 6px) !important;
// //           top: 0 !important;
// //         }

// //         .custom-git-timeline .branch-line {
// //           border-left: 1px solid #1890ff;
// //           left: 18px;
// //         }
        
// //         .ant-timeline-item {
// //           margin: 0 !important;
// //           padding: 0 0 6px 0 !important;
// //           min-height: 6px !important;
// //           position: relative;
// //         }
        
// //         .ant-timeline-item:last-child {
// //           padding-bottom: 0 !important;
// //         }
        
// //         .ant-timeline-item:last-child .ant-timeline-item-tail {
// //           display: none;
// //         }
        
// //         .ant-timeline-item-head {
// //           background: transparent !important;
// //           padding: 0 !important;
// //           width: 6px !important;
// //           height: 6px !important;
// //         }
        
// //         .ant-timeline-item-content {
// //           margin: 0 0 0 8px !important;
// //           padding: 0 !important;
// //           min-height: 6px !important;
// //           line-height: 1 !important;
// //           display: flex !important;
// //           align-items: center !important;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // //   // const findMainBranch = (branches) => {
// // //   //   return branches?.find?.(b => 
// // //   //     b.branch?.toLowerCase() === 'master' || b.branch?.toLowerCase() === 'main'
// // //   //   ) || branches?.[0];
// // //   // };

// // //   // const processCommits = () => {
// // //   //   const mainBranch = findMainBranch(data.branches);
// // //   //   const items = [];

// // //   //   data.branches.forEach((branchData) => {
// // //   //     const { branch, commits } = branchData;
// // //   //     const isMainBranch = branch === mainBranch?.branch;
// // //   //     const color = branch.toLowerCase() === 'arc' ? '#1890ff' : '#8c8c8c';

// // //   //     commits.forEach((commit, index) => {
// // //   //       items.push({
// // //   //         dot: (
// // //   //           <div style={{ position: 'relative' }}>
// // //   //             <div 
// // //   //               style={{ 
// // //   //                 width: '6px',
// // //   //                 height: '6px',
// // //   //                 borderRadius: '50%',
// // //   //                 backgroundColor: commit.isMerge ? 'white' : color,
// // //   //                 border: `1px solid ${color}`,
// // //   //               }}
// // //   //             />
// // //   //             {!isMainBranch && (
// // //   //               <div 
// // //   //                 style={{ 
// // //   //                   position: 'absolute',
// // //   //                   width: '16px',
// // //   //                   borderTop: `1px solid ${color}`,
// // //   //                   left: '-14px',
// // //   //                   top: '50%',
// // //   //                   display: index === 0 || index === commits.length - 1 ? 'block' : 'none',
// // //   //                   transform: index === 0 ? 'rotate(-45deg)' : index === commits.length - 1 ? 'rotate(45deg)' : 'none'
// // //   //                 }}
// // //   //               />
// // //   //             )}
// // //   //           </div>
// // //   //         ),
// // //   //         children: (
// // //   //           <div style={{ 
// // //   //             display: 'flex', 
// // //   //             alignItems: 'center',
// // //   //             marginLeft: isMainBranch ? '0' : '16px'
// // //   //           }}>
// // //   //             <div style={{
// // //   //               padding: '0 4px',
// // //   //               fontSize: '10px',
// // //   //               border: `1px solid ${color}`,
// // //   //               borderRadius: '9999px',
// // //   //               marginRight: '6px',
// // //   //               color: color,
// // //   //               lineHeight: '12px'
// // //   //             }}>
// // //   //               {branch}
// // //   //             </div>
              
// // //   //             <div style={{ 
// // //   //               display: 'flex', 
// // //   //               alignItems: 'center', 
// // //   //               gap: '4px',
// // //   //               color: '#d1d5db',
// // //   //               fontSize: '11px',
// // //   //               lineHeight: '12px'
// // //   //             }}>
// // //   //               <span style={{ fontFamily: 'monospace' }}>
// // //   //                 {commit.commit_hash?.substring(0, 7)}
// // //   //               </span>
// // //   //               <span>{commit.message}</span>
// // //   //               <span>- {commit.author?.name}</span>
// // //   //               {commit.tag && (
// // //   //                 <div style={{
// // //   //                   padding: '0 4px',
// // //   //                   backgroundColor: '#374151',
// // //   //                   fontSize: '10px',
// // //   //                   borderRadius: '2px',
// // //   //                   color: '#d1d5db'
// // //   //                 }}>
// // //   //                   {commit.tag}
// // //   //                 </div>
// // //   //               )}
// // //   //             </div>
// // //   //           </div>
// // //   //         )
// // //   //       });
// // //   //     });
// // //   //   });

// // //   //   return items;
// // //   // };

// // //   // return (
// // //   //   <div style={{ 
// // //   //     height: '100vh', 
// // //   //     backgroundColor: '#1e1e2e', 
// // //   //     overflow: 'hidden' 
// // //   //   }}>
// // //   //     <div style={{ 
// // //   //       height: '100%', 
// // //   //       padding: '16px', 
// // //   //       overflowY: 'auto' 
// // //   //     }}>
// // //   //       <Timeline
// // //   //         items={processCommits()}
// // //   //         className="custom-git-timeline"
// // //   //       />
// // //   //     </div>
// // //   //     <style jsx global>{`
// // //   //       .custom-git-timeline {
// // //   //         margin: 0;
// // //   //         padding: 0;
// // //   //       }
        
// // //   //       .custom-git-timeline .ant-timeline-item-tail {
// // //   //         border-left: 1px solid #4a4a57;
// // //   //         left: 2px;
// // //   //         height: calc(100% + 6px) !important;
// // //   //         top: 0 !important;
// // //   //       }
        
// // //   //       .ant-timeline-item {
// // //   //         margin: 0 !important;
// // //   //         padding: 0 0 6px 0 !important;
// // //   //         min-height: 6px !important;
// // //   //         position: relative;
// // //   //       }
        
// // //   //       .ant-timeline-item:last-child {
// // //   //         padding-bottom: 0 !important;
// // //   //       }
        
// // //   //       .ant-timeline-item:last-child .ant-timeline-item-tail {
// // //   //         display: none;
// // //   //       }
        
// // //   //       .ant-timeline-item-head {
// // //   //         background: transparent !important;
// // //   //         padding: 0 !important;
// // //   //         width: 6px !important;
// // //   //         height: 6px !important;
// // //   //       }
        
// // //   //       .ant-timeline-item-content {
// // //   //         margin: 0 0 0 8px !important;
// // //   //         padding: 0 !important;
// // //   //         min-height: 6px !important;
// // //   //         line-height: 1 !important;
// // //   //         display: flex !important;
// // //   //         align-items: center !important;
// // //   //       }
// // //   //     `}</style>
// // //   //   </div>
// // //   // );
// // // };

// // export default GithubBranchComponent;

// import React from 'react';
// import { Timeline } from 'antd';
// import data from "./commitsfrontend.json";

// const GithubBranchComponent = () => {
//   const findMainBranch = (branches) => {
//     return branches?.find?.(b => 
//       b.branch?.toLowerCase() === 'master' || b.branch?.toLowerCase() === 'main'
//     ) || branches?.[0];
//   };

//   const processCommits = () => {
//     const mainBranch = findMainBranch(data.branches);
    
//     // First, collect all commits with their branch info and timestamp
//     const allCommits = data.branches.flatMap(branchData => 
//       branchData.commits.map(commit => ({
//         ...commit,
//         branch: branchData.branch,
//         isMainBranch: branchData.branch === mainBranch?.branch
//       }))
//     );

//     // Sort commits by timestamp
//     const sortedCommits = allCommits.sort((a, b) => 
//       new Date(b.timestamp) - new Date(a.timestamp)
//     );

//     // Process commits into timeline items
//     return sortedCommits.map((commit, index) => {
//       const isMainBranch = commit.branch === mainBranch?.branch;
//       const color = commit.branch.toLowerCase() === 'arc' ? '#1890ff' : 
//                     commit.branch.toLowerCase() === 'noarc' ? '#dc2626' : '#8c8c8c';

//       return {
//         dot: (
//           <div style={{ 
//             position: 'relative',
//             paddingLeft: isMainBranch ? 0 : '16px'
//           }}>
//             <div style={{ 
//               width: '6px',
//               height: '6px',
//               borderRadius: '50%',
//               backgroundColor: commit.isMerge ? 'white' : color,
//               border: `1px solid ${color}`,
//             }}/>
//             {!isMainBranch && (
//               <div style={{
//                 position: 'absolute',
//                 width: '16px',
//                 borderTop: `1px solid ${color}`,
//                 left: '0',
//                 top: '3px'
//               }}/>
//             )}
//           </div>
//         ),
//         children: (
//           <div style={{ 
//             display: 'flex', 
//             alignItems: 'center',
//             paddingLeft: isMainBranch ? 0 : '16px'
//           }}>
//             <div style={{
//               padding: '0 4px',
//               fontSize: '10px',
//               border: `1px solid ${color}`,
//               borderRadius: '9999px',
//               marginRight: '6px',
//               color: color,
//               lineHeight: '14px'
//             }}>
//               {commit.branch}
//             </div>
            
//             <div style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: '4px',
//               color: '#d1d5db',
//               fontSize: '11px'
//             }}>
//               <span style={{ fontFamily: 'monospace' }}>
//                 {commit.commit_hash?.substring(0, 7)}
//               </span>
//               <span>{commit.message}</span>
//               <span>- {commit.author?.name}</span>
//             </div>
//           </div>
//         )
//       };
//     });
//   };

//   return (
//     <div style={{ 
//       height: '100vh', 
//       backgroundColor: '#1e1e2e', 
//       overflow: 'hidden' 
//     }}>
//       <div style={{ 
//         height: '100%', 
//         padding: '16px', 
//         overflowY: 'auto' 
//       }}>
//         <Timeline
//           items={processCommits()}
//           className="custom-git-timeline"
//         />
//       </div>
//       <style jsx global>{`
//         .custom-git-timeline {
//           margin: 0;
//           padding: 0;
//         }
        
//         .custom-git-timeline .ant-timeline-item-tail {
//           border-left: 1px solid #4a4a57;
//           left: 2px;
//           height: calc(100% + 6px) !important;
//           top: 0 !important;
//         }
        
//         .ant-timeline-item {
//           margin: 0 !important;
//           padding: 0 0 6px 0 !important;
//           min-height: 6px !important;
//           position: relative;
//         }
        
//         .ant-timeline-item:last-child {
//           padding-bottom: 0 !important;
//         }
        
//         .ant-timeline-item:last-child .ant-timeline-item-tail {
//           display: none;
//         }
        
//         .ant-timeline-item-head {
//           background: transparent !important;
//           padding: 0 !important;
//           width: 6px !important;
//           height: 6px !important;
//         }
        
//         .ant-timeline-item-content {
//           margin: 0 0 0 8px !important;
//           padding: 0 !important;
//           min-height: 6px !important;
//           line-height: 1 !important;
//           display: flex !important;
//           align-items: center !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// const GithubBranchComponent = () => {
//   const findMainBranch = (branches) => {
//     return branches?.find?.(b => 
//       b.branch?.toLowerCase() === 'master' || b.branch?.toLowerCase() === 'main'
//     ) || branches?.[0];
//   };

//   const processCommits = () => {
//     const mainBranch = findMainBranch(data.branches);
//     const branchCommitIndices = new Map();

//     const allCommits = data.branches.flatMap(branchData => 
//       branchData.commits.map(commit => ({
//         ...commit,
//         branch: branchData.branch,
//         isMainBranch: branchData.branch === mainBranch?.branch
//       }))
//     );

//     const sortedCommits = allCommits.sort((a, b) => 
//       new Date(b.timestamp) - new Date(a.timestamp)
//     );

//     // First pass: record all indices for each branch
//     sortedCommits.forEach((commit, index) => {
//       if (!branchCommitIndices.has(commit.branch)) {
//         branchCommitIndices.set(commit.branch, []);
//       }
//       branchCommitIndices.get(commit.branch).push(index);
//     });

//     return sortedCommits.map((commit, index) => {
//       const isMainBranch = commit.branch === mainBranch?.branch;
//       const color = commit.branch.toLowerCase() === 'arc' ? '#0EA5E9' : 
//                     commit.branch.toLowerCase() === 'noarc' ? '#EF4444' : '#94A3B8';
//       const textColor = isMainBranch ? '#94A3B8' : 
//                        commit.branch.toLowerCase() === 'arc' ? '#0EA5E9' : '#EF4444';

//       // Get all indices for this branch
//       const branchIndices = branchCommitIndices.get(commit.branch);
//       const currentBranchPosition = branchIndices.indexOf(index);
//       const isFirstInBranch = currentBranchPosition === 0;
//       const isLastInBranch = currentBranchPosition === branchIndices.length - 1;
      
//       // Find next and previous commits in this branch
//       const nextIndexInBranch = branchIndices[currentBranchPosition + 1];
//       const prevIndexInBranch = branchIndices[currentBranchPosition - 1];
      
//       // Determine if we need to draw connecting lines
//       const hasNextCommit = nextIndexInBranch !== undefined;
//       const hasPrevCommit = prevIndexInBranch !== undefined;

//       return {
//         dot: (
//           <div style={{ 
//             position: 'relative',
//             paddingLeft: isMainBranch ? 0 : '16px'
//           }}>
//             <div style={{ 
//               width: '6px',
//               height: '6px',
//               borderRadius: '50%',
//               backgroundColor: isMainBranch ? color : '#1e1e2e',
//               border: `1.5px solid ${color}`,
//               position: 'relative',
//               zIndex: 2
//             }}/>
//             {!isMainBranch && (
//               <>
//                 {/* Horizontal connecting line */}
//                 <div style={{
//                   position: 'absolute',
//                   width: '16px',
//                   borderTop: `1.5px solid ${color}`,
//                   left: '0',
//                   top: '3px',
//                   zIndex: 1
//                 }}/>
                
//                 {/* Vertical line going up (if not first commit) */}
//                 {!isFirstInBranch && (
//                   <div style={{
//                     position: 'absolute',
//                     width: '1.5px',
//                     backgroundColor: color,
//                     left: '0',
//                     top: '-13px',
//                     height: '16px',
//                     zIndex: 1
//                   }}/>
//                 )}
                
//                 {/* Vertical line going down (if not last commit) */}
//                 {!isLastInBranch && (
//                   <div style={{
//                     position: 'absolute',
//                     width: '1.5px',
//                     backgroundColor: color,
//                     left: '0',
//                     top: '3px',
//                     height: '23px',
//                     zIndex: 1
//                   }}/>
//                 )}
                
//                 {/* Branch start curve (only for first commit in branch) */}
//                 {isFirstInBranch && (
//                   <div style={{
//                     position: 'absolute',
//                     width: '16px',
//                     height: '16px',
//                     left: '0',
//                     top: '-13px',
//                     borderLeft: `1.5px solid ${color}`,
//                     borderBottom: `1.5px solid ${color}`,
//                     borderBottomLeftRadius: '8px',
//                     zIndex: 1
//                   }}/>
//                 )}
                
//                 {/* Branch end curve (only for last commit in branch) */}
//                 {isLastInBranch && (
//                   <div style={{
//                     position: 'absolute',
//                     width: '16px',
//                     height: '16px',
//                     left: '0',
//                     top: '3px',
//                     borderLeft: `1.5px solid ${color}`,
//                     borderTop: `1.5px solid ${color}`,
//                     borderTopLeftRadius: '8px',
//                     zIndex: 1
//                   }}/>
//                 )}
//               </>
//             )}
//           </div>
//         ),
//         children: (
//           <div style={{ 
//             display: 'flex', 
//             alignItems: 'center',
//             paddingLeft: isMainBranch ? 0 : '16px',
//             marginTop: '-2px'
//           }}>
//             <div style={{
//               padding: '1px 6px',
//               fontSize: '11px',
//               border: `1.5px solid ${color}`,
//               borderRadius: '9999px',
//               marginRight: '8px',
//               color: textColor,
//               backgroundColor: '#1e1e2e',
//               fontWeight: 500,
//             }}>
//               {commit.branch}
//             </div>
            
//             <div style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: '4px',
//               color: textColor,
//               fontSize: '12px',
//               fontWeight: 400
//             }}>
//               <span style={{ 
//                 fontFamily: 'monospace',
//                 marginRight: '4px'
//               }}>
//                 {commit.commit_hash?.substring(0, 7)}
//               </span>
//               <span style={{ color: '#94A3B8' }}>{commit.message}</span>
//               <span style={{ color: '#94A3B8' }}>- {commit.author?.name}</span>
//             </div>
//           </div>
//         )
//       };
//     });
//   };

//   return (
//     <div style={{ 
//       height: '100vh', 
//       backgroundColor: '#1e1e2e', 
//       overflow: 'hidden' 
//     }}>
//       <div style={{ 
//         height: '100%', 
//         padding: '24px', 
//         overflowY: 'auto' 
//       }}>
//         <Timeline
//           items={processCommits()}
//           className="custom-git-timeline"
//         />
//       </div>
//       <style jsx global>{`
//         .custom-git-timeline {
//           margin: 0;
//           padding: 0;
//         }
        
//         .custom-git-timeline .ant-timeline-item-tail {
//           border-left: 1.5px solid #334155;
//           left: 2px;
//           height: calc(100% + 10px) !important;
//           top: 0 !important;
//           opacity: 0.4;
//         }
        
//         .ant-timeline-item {
//           margin: 0 !important;
//           padding: 0 0 10px 0 !important;
//           min-height: 10px !important;
//           position: relative;
//         }
        
//         .ant-timeline-item:last-child {
//           padding-bottom: 0 !important;
//         }
        
//         .ant-timeline-item:last-child .ant-timeline-item-tail {
//           display: none;
//         }
        
//         .ant-timeline-item-head {
//           background: transparent !important;
//           padding: 0 !important;
//           width: 6px !important;
//           height: 6px !important;
//         }
        
//         .ant-timeline-item-content {
//           margin: 0 0 0 12px !important;
//           padding: 0 !important;
//           min-height: 10px !important;
//           line-height: 1.2 !important;
//         }
//       `}</style>
//     </div>
//   );
// };
//   const findMainBranch = (branches) => {
//     return branches?.find?.(b => 
//       b.branch?.toLowerCase() === 'master' || b.branch?.toLowerCase() === 'main'
//     ) || branches?.[0];
//   };

//   const processCommits = () => {
//     const mainBranch = findMainBranch(data.branches);
//     let currentBranch = null;
//     let branchStartPoint = null;

//     const allCommits = data.branches.flatMap(branchData => 
//       branchData.commits.map(commit => ({
//         ...commit,
//         branch: branchData.branch,
//         isMainBranch: branchData.branch === mainBranch?.branch
//       }))
//     );

//     const sortedCommits = allCommits.sort((a, b) => 
//       new Date(b.timestamp) - new Date(a.timestamp)
//     );

//     return sortedCommits.map((commit, index) => {
//       const isMainBranch = commit.branch === mainBranch?.branch;
//       const color = commit.branch.toLowerCase() === 'arc' ? '#0EA5E9' : 
//                     commit.branch.toLowerCase() === 'noarc' ? '#EF4444' : '#94A3B8';
//       const textColor = isMainBranch ? '#94A3B8' : 
//                        commit.branch.toLowerCase() === 'arc' ? '#0EA5E9' : '#EF4444';

//       // Track branch changes for connection lines
//       const isBranchStart = !isMainBranch && currentBranch !== commit.branch;
//       const isBranchEnd = !isMainBranch && (
//         index === sortedCommits.length - 1 || 
//         sortedCommits[index + 1].branch !== commit.branch
//       );

//       if (isBranchStart) {
//         currentBranch = commit.branch;
//         branchStartPoint = index;
//       }

//       if (isBranchEnd) {
//         currentBranch = null;
//       }

//       return {
//         dot: (
//           <div style={{ 
//             position: 'relative',
//             paddingLeft: isMainBranch ? 0 : '16px'
//           }}>
//             <div style={{ 
//               width: '6px',
//               height: '6px',
//               borderRadius: '50%',
//               backgroundColor: isMainBranch ? color : '#1e1e2e',
//               border: `1.5px solid ${color}`,
//               position: 'relative',
//               zIndex: 2
//             }}/>
//             {!isMainBranch && (
//               <>
//                 {/* Horizontal connecting line */}
//                 <div style={{
//                   position: 'absolute',
//                   width: '16px',
//                   borderTop: `1.5px solid ${color}`,
//                   left: '0',
//                   top: '3px',
//                   zIndex: 1
//                 }}/>
//                 {/* Branch start curve */}
//                 {isBranchStart && (
//                   <div style={{
//                     position: 'absolute',
//                     width: '16px',
//                     height: '16px',
//                     left: '0',
//                     top: '-13px',
//                     borderLeft: `1.5px solid ${color}`,
//                     borderBottom: `1.5px solid ${color}`,
//                     borderBottomLeftRadius: '8px',
//                     zIndex: 1
//                   }}/>
//                 )}
//                 {/* Branch end curve */}
//                 {isBranchEnd && (
//                   <div style={{
//                     position: 'absolute',
//                     width: '16px',
//                     height: '16px',
//                     left: '0',
//                     top: '3px',
//                     borderLeft: `1.5px solid ${color}`,
//                     borderTop: `1.5px solid ${color}`,
//                     borderTopLeftRadius: '8px',
//                     zIndex: 1
//                   }}/>
//                 )}
//               </>
//             )}
//           </div>
//         ),
//         children: (
//           <div style={{ 
//             display: 'flex', 
//             alignItems: 'center',
//             paddingLeft: isMainBranch ? 0 : '16px',
//             marginTop: '-2px'
//           }}>
//             <div style={{
//               padding: '1px 6px',
//               fontSize: '11px',
//               border: `1.5px solid ${color}`,
//               borderRadius: '9999px',
//               marginRight: '8px',
//               color: textColor,
//               backgroundColor: '#1e1e2e',
//               fontWeight: 500,
//             }}>
//               {commit.branch}
//             </div>
            
//             <div style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: '4px',
//               color: textColor,
//               fontSize: '12px',
//               fontWeight: 400
//             }}>
//               <span style={{ 
//                 fontFamily: 'monospace',
//                 marginRight: '4px'
//               }}>
//                 {commit.commit_hash?.substring(0, 7)}
//               </span>
//               <span style={{ color: '#94A3B8' }}>{commit.message}</span>
//               <span style={{ color: '#94A3B8' }}>- {commit.author?.name}</span>
//             </div>
//           </div>
//         )
//       };
//     });
//   };

//   return (
//     <div style={{ 
//       height: '100vh', 
//       backgroundColor: '#1e1e2e', 
//       overflow: 'hidden' 
//     }}>
//       <div style={{ 
//         height: '100%', 
//         padding: '24px', 
//         overflowY: 'auto' 
//       }}>
//         <Timeline
//           items={processCommits()}
//           className="custom-git-timeline"
//         />
//       </div>
//       <style jsx global>{`
//         .custom-git-timeline {
//           margin: 0;
//           padding: 0;
//         }
        
//         .custom-git-timeline .ant-timeline-item-tail {
//           border-left: 1.5px solid #334155;
//           left: 2px;
//           height: calc(100% + 10px) !important;
//           top: 0 !important;
//           opacity: 0.4;
//         }
        
//         .ant-timeline-item {
//           margin: 0 !important;
//           padding: 0 0 10px 0 !important;
//           min-height: 10px !important;
//           position: relative;
//         }
        
//         .ant-timeline-item:last-child {
//           padding-bottom: 0 !important;
//         }
        
//         .ant-timeline-item:last-child .ant-timeline-item-tail {
//           display: none;
//         }
        
//         .ant-timeline-item-head {
//           background: transparent !important;
//           padding: 0 !important;
//           width: 6px !important;
//           height: 6px !important;
//         }
        
//         .ant-timeline-item-content {
//           margin: 0 0 0 12px !important;
//           padding: 0 !important;
//           min-height: 10px !important;
//           line-height: 1.2 !important;
//         }
//       `}</style>
//     </div>
//   );
// };
//   const findMainBranch = (branches) => {
//     return branches?.find?.(b => 
//       b.branch?.toLowerCase() === 'master' || b.branch?.toLowerCase() === 'main'
//     ) || branches?.[0];
//   };

//   const processCommits = () => {
//     const mainBranch = findMainBranch(data.branches);
//     const allCommits = data.branches.flatMap(branchData => 
//       branchData.commits.map(commit => ({
//         ...commit,
//         branch: branchData.branch,
//         isMainBranch: branchData.branch === mainBranch?.branch
//       }))
//     );

//     const sortedCommits = allCommits.sort((a, b) => 
//       new Date(b.timestamp) - new Date(a.timestamp)
//     );

//     return sortedCommits.map((commit, index) => {
//       const isMainBranch = commit.branch === mainBranch?.branch;
//       const color = commit.branch.toLowerCase() === 'arc' ? '#0EA5E9' : 
//                     commit.branch.toLowerCase() === 'noarc' ? '#EF4444' : '#94A3B8';
//       const textColor = isMainBranch ? '#94A3B8' : 
//                        commit.branch.toLowerCase() === 'arc' ? '#0EA5E9' : '#EF4444';

//       return {
//         dot: (
//           <div style={{ 
//             position: 'relative',
//             paddingLeft: isMainBranch ? 0 : '16px'
//           }}>
//             <div style={{ 
//               width: '6px',
//               height: '6px',
//               borderRadius: '50%',
//               backgroundColor: isMainBranch ? color : '#1e1e2e',
//               border: `1.5px solid ${color}`,
//               position: 'relative',
//               zIndex: 2
//             }}/>
//             {!isMainBranch && (
//               <div style={{
//                 position: 'absolute',
//                 width: '16px',
//                 borderTop: `1.5px solid ${color}`,
//                 left: '0',
//                 top: '3px',
//                 zIndex: 1
//               }}/>
//             )}
//           </div>
//         ),
//         children: (
//           <div style={{ 
//             display: 'flex', 
//             alignItems: 'center',
//             paddingLeft: isMainBranch ? 0 : '16px',
//             marginTop: '-2px'
//           }}>
//             <div style={{
//               padding: '1px 6px',
//               fontSize: '11px',
//               border: `1.5px solid ${color}`,
//               borderRadius: '9999px',
//               marginRight: '8px',
//               color: textColor,
//               backgroundColor: '#1e1e2e',
//               fontWeight: 500,
//             }}>
//               {commit.branch}
//             </div>
            
//             <div style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: '4px',
//               color: textColor,
//               fontSize: '12px',
//               fontWeight: 400
//             }}>
//               <span style={{ 
//                 fontFamily: 'monospace',
//                 marginRight: '4px'
//               }}>
//                 {commit.commit_hash?.substring(0, 7)}
//               </span>
//               <span style={{ color: '#94A3B8' }}>{commit.message}</span>
//               <span style={{ color: '#94A3B8' }}>- {commit.author?.name}</span>
//             </div>
//           </div>
//         )
//       };
//     });
//   };

//   return (
//     <div style={{ 
//       height: '100vh', 
//       backgroundColor: '#1e1e2e', 
//       overflow: 'hidden' 
//     }}>
//       <div style={{ 
//         height: '100%', 
//         padding: '24px', 
//         overflowY: 'auto' 
//       }}>
//         <Timeline
//           items={processCommits()}
//           className="custom-git-timeline"
//         />
//       </div>
//       <style jsx global>{`
//         .custom-git-timeline {
//           margin: 0;
//           padding: 0;
//         }
        
//         .custom-git-timeline .ant-timeline-item-tail {
//           border-left: 1.5px solid #334155;
//           left: 2px;
//           height: calc(100% + 10px) !important;
//           top: 0 !important;
//           opacity: 0.4;
//         }
        
//         .ant-timeline-item {
//           margin: 0 !important;
//           padding: 0 0 10px 0 !important;
//           min-height: 10px !important;
//           position: relative;
//         }
        
//         .ant-timeline-item:last-child {
//           padding-bottom: 0 !important;
//         }
        
//         .ant-timeline-item:last-child .ant-timeline-item-tail {
//           display: none;
//         }
        
//         .ant-timeline-item-head {
//           background: transparent !important;
//           padding: 0 !important;
//           width: 6px !important;
//           height: 6px !important;
//         }
        
//         .ant-timeline-item-content {
//           margin: 0 0 0 12px !important;
//           padding: 0 !important;
//           min-height: 10px !important;
//           line-height: 1.2 !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default GithubBranchComponent;

////////////////////////////////////////////////////////////
//Working
// import React, { useMemo } from 'react';
// import { Timeline } from 'antd';
// import data from "./commits_frontend.json";

// const GithubBranchComponent = () => {
//   // Generate a color based on branch name
//   const getBranchColor = (branchName) => {
//     // Predefined colors for common branch names
//     const commonBranchColors = {
//       master: '#94A3B8',
//       main: '#94A3B8',
//       develop: '#10B981',
//       development: '#10B981',
//       staging: '#F59E0B',
//       production: '#EF4444',
//     };

//     // Return predefined color if exists
//     if (commonBranchColors[branchName.toLowerCase()]) {
//       return commonBranchColors[branchName.toLowerCase()];
//     }

//     // Generate consistent color based on branch name
//     let hash = 0;
//     for (let i = 0; i < branchName.length; i++) {
//       hash = branchName.charCodeAt(i) + ((hash << 5) - hash);
//     }

//     // Create HSL color with consistent saturation and lightness
//     const hue = hash % 360;
//     return `hsl(${hue}, 70%, 50%)`;
//   };

//   // Memoize branch colors to maintain consistency
//   const branchColors = useMemo(() => {
//     const colors = new Map();
//     data.branches.forEach(branch => {
//       colors.set(branch.branch, getBranchColor(branch.branch));
//     });
//     return colors;
//   }, []);

//   const findMainBranch = (branches) => {
//     return branches?.find?.(b => 
//       b.branch?.toLowerCase() === 'master' || b.branch?.toLowerCase() === 'main'
//     ) || branches?.[0];
//   };

//   const processCommits = () => {
//     const mainBranch = findMainBranch(data.branches);
//     const branchCommitIndices = new Map();

//     const allCommits = data.branches.flatMap(branchData => 
//       branchData.commits.map(commit => ({
//         ...commit,
//         branch: branchData.branch,
//         isMainBranch: branchData.branch === mainBranch?.branch
//       }))
//     );

//     const sortedCommits = allCommits.sort((a, b) => 
//       new Date(b.timestamp) - new Date(a.timestamp)
//     );

//     sortedCommits.forEach((commit, index) => {
//       if (!branchCommitIndices.has(commit.branch)) {
//         branchCommitIndices.set(commit.branch, []);
//       }
//       branchCommitIndices.get(commit.branch).push(index);
//     });

//     return sortedCommits.map((commit, index) => {
//       const isMainBranch = commit.branch === mainBranch?.branch;
//       const color = branchColors.get(commit.branch);
//       const textColor = isMainBranch ? '#94A3B8' : color;

//       const branchIndices = branchCommitIndices.get(commit.branch);
//       const currentBranchPosition = branchIndices.indexOf(index);
//       const isFirstInBranch = currentBranchPosition === 0;
//       const isLastInBranch = currentBranchPosition === branchIndices.length - 1;

//       return {
//         dot: (
//           <div style={{ 
//             position: 'relative',
//             paddingLeft: isMainBranch ? 0 : '16px'
//           }}>
//             <div style={{ 
//               width: '6px',
//               height: '6px',
//               borderRadius: '50%',
//               backgroundColor: isMainBranch ? color : '#1e1e2e',
//               border: `1.5px solid ${color}`,
//               position: 'relative',
//               zIndex: 2
//             }}/>
//             {!isMainBranch && (
//               <>
//                 {/* Horizontal connecting line */}
//                 <div style={{
//                   position: 'absolute',
//                   width: '16px',
//                   borderTop: `1.5px solid ${color}`,
//                   left: '0',
//                   top: '3px',
//                   zIndex: 1
//                 }}/>
                
//                 {/* Vertical line going up (if not first commit) */}
//                 {!isFirstInBranch && (
//                   <div style={{
//                     position: 'absolute',
//                     width: '1.5px',
//                     backgroundColor: color,
//                     left: '0',
//                     top: '-13px',
//                     height: '16px',
//                     zIndex: 1
//                   }}/>
//                 )}
                
//                 {/* Vertical line going down (if not last commit) */}
//                 {!isLastInBranch && (
//                   <div style={{
//                     position: 'absolute',
//                     width: '1.5px',
//                     backgroundColor: color,
//                     left: '0',
//                     top: '3px',
//                     height: '23px',
//                     zIndex: 1
//                   }}/>
//                 )}
                
//                 {/* Branch start curve (only for first commit in branch) */}
//                 {isFirstInBranch && (
//                   <div style={{
//                     position: 'absolute',
//                     width: '16px',
//                     height: '16px',
//                     left: '0',
//                     top: '-13px',
//                     borderLeft: `1.5px solid ${color}`,
//                     borderBottom: `1.5px solid ${color}`,
//                     borderBottomLeftRadius: '8px',
//                     zIndex: 1
//                   }}/>
//                 )}
                
//                 {/* Branch end curve (only for last commit in branch) */}
//                 {isLastInBranch && (
//                   <div style={{
//                     position: 'absolute',
//                     width: '16px',
//                     height: '16px',
//                     left: '0',
//                     top: '3px',
//                     borderLeft: `1.5px solid ${color}`,
//                     borderTop: `1.5px solid ${color}`,
//                     borderTopLeftRadius: '8px',
//                     zIndex: 1
//                   }}/>
//                 )}
//               </>
//             )}
//           </div>
//         ),
//         children: (
//           <div style={{ 
//             display: 'flex', 
//             alignItems: 'center',
//             paddingLeft: isMainBranch ? 0 : '16px',
//             marginTop: '-2px'
//           }}>
//             <div style={{
//               padding: '1px 6px',
//               fontSize: '11px',
//               border: `1.5px solid ${color}`,
//               borderRadius: '9999px',
//               marginRight: '8px',
//               color: textColor,
//               backgroundColor: '#1e1e2e',
//               fontWeight: 500,
//             }}>
//               {commit.branch}
//             </div>
            
//             <div style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: '4px',
//               color: textColor,
//               fontSize: '12px',
//               fontWeight: 400
//             }}>
//               <span style={{ 
//                 fontFamily: 'monospace',
//                 marginRight: '4px'
//               }}>
//                 {commit.commit_hash?.substring(0, 7)}
//               </span>
//               <span style={{ color: '#94A3B8' }}>{commit.message}</span>
//               <span style={{ color: '#94A3B8' }}>- {commit.author?.name}</span>
//             </div>
//           </div>
//         )
//       };
//     });
//   };

//   return (
//     <div style={{ 
//       height: '100vh', 
//       backgroundColor: '#1e1e2e', 
//       overflow: 'hidden' 
//     }}>
//       <div style={{ 
//         height: '100%', 
//         padding: '24px', 
//         overflowY: 'auto' 
//       }}>
//         <Timeline
//           items={processCommits()}
//           className="custom-git-timeline"
//         />
//       </div>
//       <style jsx global>{`
//         .custom-git-timeline {
//           margin: 0;
//           padding: 0;
//         }
        
//         .custom-git-timeline .ant-timeline-item-tail {
//           border-left: 1.5px solid #334155;
//           left: 2px;
//           height: calc(100% + 10px) !important;
//           top: 0 !important;
//           opacity: 0.4;
//         }
        
//         .ant-timeline-item {
//           margin: 0 !important;
//           padding: 0 0 10px 0 !important;
//           min-height: 10px !important;
//           position: relative;
//         }
        
//         .ant-timeline-item:last-child {
//           padding-bottom: 0 !important;
//         }
        
//         .ant-timeline-item:last-child .ant-timeline-item-tail {
//           display: none;
//         }
        
//         .ant-timeline-item-head {
//           background: transparent !important;
//           padding: 0 !important;
//           width: 6px !important;
//           height: 6px !important;
//         }
        
//         .ant-timeline-item-content {
//           margin: 0 0 0 12px !important;
//           padding: 0 !important;
//           min-height: 10px !important;
//           line-height: 1.2 !important;
//         }
//       `}</style>
//     </div>
//   );
// };



// export default GithubBranchComponent;

// import React, { useMemo } from 'react';
// import { Timeline } from 'antd';
// import data from "./commits_frontend.json";

// const GithubBranchComponent = () => {
//   const getBranchColor = (branchName) => {
//     const commonBranchColors = {
//       master: '#94A3B8',
//       main: '#94A3B8',
//       develop: '#10B981',
//       development: '#10B981',
//       staging: '#F59E0B',
//       production: '#EF4444',
//     };

//     if (commonBranchColors[branchName.toLowerCase()]) {
//       return commonBranchColors[branchName.toLowerCase()];
//     }

//     let hash = 0;
//     for (let i = 0; i < branchName.length; i++) {
//       hash = branchName.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     const hue = hash % 360;
//     return `hsl(${hue}, 70%, 50%)`;
//   };

//   const branchColors = useMemo(() => {
//     const colors = new Map();
//     data.branches.forEach(branch => {
//       colors.set(branch.branch, getBranchColor(branch.branch));
//     });
//     return colors;
//   }, []);

//   const handleCommitClick = (commit) => {
//     alert(`Commit clicked: ${commit.commit_hash}`);
//   };

//   const findMainBranch = (branches) => {
//     return branches?.find?.(b => 
//       b.branch?.toLowerCase() === 'master' || b.branch?.toLowerCase() === 'main'
//     ) || branches?.[0];
//   };

//   const truncateMessage = (message) => {
//     const words = message.split(' ').slice(0, 3);  // Reduced to 3 words
//     return words.join(' ') + (message.split(' ').length > 3 ? '...' : '');
//   };

//   const processCommits = () => {
//     const mainBranch = findMainBranch(data.branches);
//     const branchCommitIndices = new Map();

//     const allCommits = data.branches.flatMap(branchData => 
//       branchData.commits.map(commit => ({
//         ...commit,
//         branch: branchData.branch,
//         isMainBranch: branchData.branch === mainBranch?.branch
//       }))
//     );

//     const sortedCommits = allCommits.sort((a, b) => 
//       new Date(b.timestamp) - new Date(a.timestamp)
//     );

//     sortedCommits.forEach((commit, index) => {
//       if (!branchCommitIndices.has(commit.branch)) {
//         branchCommitIndices.set(commit.branch, []);
//       }
//       branchCommitIndices.get(commit.branch).push(index);
//     });

//     return sortedCommits.map((commit, index) => {
//       const isMainBranch = commit.branch === mainBranch?.branch;
//       const color = branchColors.get(commit.branch);
//       const textColor = isMainBranch ? '#94A3B8' : color;

//       const branchIndices = branchCommitIndices.get(commit.branch);
//       const currentBranchPosition = branchIndices.indexOf(index);
//       const isFirstInBranch = currentBranchPosition === 0;
//       const isLastInBranch = currentBranchPosition === branchIndices.length - 1;

//       return {
//         dot: (
//           <div 
//             style={{ 
//               position: 'relative',
//               paddingLeft: isMainBranch ? 0 : '16px',
//               cursor: 'pointer'
//             }}
//             onClick={() => handleCommitClick(commit)}
//           >
//             <div style={{ 
//               width: '12px',          // Increased from 10px
//               height: '12px',         // Increased from 10px
//               borderRadius: '50%',
//               backgroundColor: isMainBranch ? color : '#1e1e2e',
//               border: `2px solid ${color}`,
//               position: 'relative',
//               zIndex: 2
//             }}/>
//             {!isMainBranch && (
//               <>
//                 <div style={{
//                   position: 'absolute',
//                   width: '16px',
//                   borderTop: `2px solid ${color}`,
//                   left: '0',
//                   top: '5px',
//                   zIndex: 1
//                 }}/>
                
//                 {!isFirstInBranch && (
//                   <div style={{
//                     position: 'absolute',
//                     width: '2px',
//                     backgroundColor: color,
//                     left: '0',
//                     top: '-15px',
//                     height: '20px',
//                     zIndex: 1
//                   }}/>
//                 )}
                
//                 {!isLastInBranch && (
//                   <div style={{
//                     position: 'absolute',
//                     width: '2px',
//                     backgroundColor: color,
//                     left: '0',
//                     top: '5px',
//                     height: '25px',
//                     zIndex: 1
//                   }}/>
//                 )}
                
//                 {isFirstInBranch && (
//                   <div style={{
//                     position: 'absolute',
//                     width: '16px',
//                     height: '16px',
//                     left: '0',
//                     top: '-15px',
//                     borderLeft: `2px solid ${color}`,
//                     borderBottom: `2px solid ${color}`,
//                     borderBottomLeftRadius: '8px',
//                     zIndex: 1
//                   }}/>
//                 )}
                
//                 {isLastInBranch && (
//                   <div style={{
//                     position: 'absolute',
//                     width: '16px',
//                     height: '16px',
//                     left: '0',
//                     top: '5px',
//                     borderLeft: `2px solid ${color}`,
//                     borderTop: `2px solid ${color}`,
//                     borderTopLeftRadius: '8px',
//                     zIndex: 1
//                   }}/>
//                 )}
//               </>
//             )}
//           </div>
//         ),
//         children: (
//           <div 
//             style={{ 
//               display: 'flex', 
//               alignItems: 'center',
//               paddingLeft: isMainBranch ? 0 : '16px',
//               marginTop: '-2px',
//               cursor: 'pointer'
//             }}
//             onClick={() => handleCommitClick(commit)}
//           >
//             <div style={{
//               padding: '3px 10px',    // Increased padding
//               fontSize: '14px',       // Increased from 13px
//               border: `2px solid ${color}`,
//               borderRadius: '9999px',
//               marginRight: '8px',
//               color: textColor,
//               backgroundColor: '#1e1e2e',
//               fontWeight: 500,
//             }}>
//               {commit.branch}
//             </div>
            
//             <div style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: '8px',
//               color: textColor,
//               fontSize: '15px',       // Increased from 14px
//               fontWeight: 400
//             }}>
//               <span style={{ 
//                 fontFamily: 'monospace',
//                 marginRight: '4px'
//               }}>
//                 {commit.commit_hash?.substring(0, 7)}
//               </span>
//               <span style={{ color: '#94A3B8' }}>{truncateMessage(commit.message)}</span>
//               <span style={{ color: '#94A3B8' }}>- {commit.author?.name}</span>
//             </div>
//           </div>
//         )
//       };
//     });
//   };

//   return (
//     <div style={{ 
//       backgroundColor: '#1e1e2e',
//       height: '100%',
//       width: '100%',
//       position: 'relative',
//       top: 0,
//       left: 0,
//       padding: '20px 20px',
//       margin: '24px',
//       borderRadius: '8px',
//       margin: 0
//     }}>
//       <div style={{ 
//         height: 'calc(100vh - 60px)',
//         width: '100%',
//         overflowY: 'auto',
//         overflowX: 'hidden'
//       }}>
//         <Timeline
//           items={processCommits()}
//           className="custom-git-timeline"
//         />
//       </div>
//       <style jsx global>{`
//         .custom-git-timeline {
//           margin: 0;
//           padding: 0;
//         }
        
//         .custom-git-timeline .ant-timeline-item-tail {
//           border-left: 2px solid #334155;
//           left: 4px;
//           height: calc(100% + 10px) !important;
//           top: 0 !important;
//           opacity: 0.4;
//         }
        
//         .ant-timeline-item {
//           margin: 0 !important;
//           padding: 0 0 12px 0 !important;
//           min-height: 12px !important;
//           position: relative;
//           cursor: pointer;
//         }
        
//         .ant-timeline-item:last-child {
//           padding-bottom: 0 !important;
//         }
        
//         .ant-timeline-item:last-child .ant-timeline-item-tail {
//           display: none;
//         }
        
//         .ant-timeline-item-head {
//           background: transparent !important;
//           padding: 0 !important;
//           width: 12px !important;
//           height: 12px !important;
//         }
        
//         .ant-timeline-item-content {
//           margin: 0 0 0 16px !important;
//           padding: 0 !important;
//           min-height: 12px !important;
//           line-height: 1.4 !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default GithubBranchComponent;

import React, { useMemo } from 'react';
import { Timeline } from 'antd';
import data from "./commits_frontend.json";

const GithubBranchComponent = () => {
  const getBranchColor = (branchName) => {
    const commonBranchColors = {
      master: '#94A3B8',
      main: '#94A3B8',
      develop: '#10B981',
      development: '#10B981',
      staging: '#F59E0B',
      production: '#EF4444',
    };

    if (commonBranchColors[branchName.toLowerCase()]) {
      return commonBranchColors[branchName.toLowerCase()];
    }

    let hash = 0;
    for (let i = 0; i < branchName.length; i++) {
      hash = branchName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const branchColors = useMemo(() => {
    const colors = new Map();
    data.branches.forEach(branch => {
      colors.set(branch.branch, getBranchColor(branch.branch));
    });
    return colors;
  }, []);

  const handleCommitClick = (commit) => {
    // Dispatch a custom event with commit hash
    const event = new CustomEvent('analyze-commit', {
        detail: { commitId: commit.commit_hash }
    });
    window.dispatchEvent(event);
  };

  const findMainBranch = (branches) => {
    return branches?.find?.(b => 
      b.branch?.toLowerCase() === 'master' || b.branch?.toLowerCase() === 'main'
    ) || branches?.[0];
  };

  const truncateMessage = (message) => {
    const words = message.split(' ').slice(0, 3);
    return words.join(' ') + (message.split(' ').length > 3 ? '...' : '');
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
          <div 
            style={{ 
              position: 'relative',
              paddingLeft: isMainBranch ? 0 : '16px',
              cursor: 'pointer'
            }}
            onClick={() => handleCommitClick(commit)}
          >
            <div style={{ 
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: isMainBranch ? color : '#1e1e2e',
              border: `2px solid ${color}`,
              position: 'relative',
              zIndex: 2
            }}/>
            {!isMainBranch && (
              <>
                <div style={{
                  position: 'absolute',
                  width: '16px',
                  borderTop: `2px solid ${color}`,
                  left: '0',
                  top: '5px',
                  zIndex: 1
                }}/>
                
                {!isFirstInBranch && (
                  <div style={{
                    position: 'absolute',
                    width: '2px',
                    backgroundColor: color,
                    left: '0',
                    top: '-15px',
                    height: '20px',
                    zIndex: 1
                  }}/>
                )}
                
                {!isLastInBranch && (
                  <div style={{
                    position: 'absolute',
                    width: '2px',
                    backgroundColor: color,
                    left: '0',
                    top: '5px',
                    height: '25px',
                    zIndex: 1
                  }}/>
                )}
                
                {isFirstInBranch && (
                  <div style={{
                    position: 'absolute',
                    width: '16px',
                    height: '16px',
                    left: '0',
                    top: '-15px',
                    borderLeft: `2px solid ${color}`,
                    borderBottom: `2px solid ${color}`,
                    borderBottomLeftRadius: '8px',
                    zIndex: 1
                  }}/>
                )}
                
                {isLastInBranch && (
                  <div style={{
                    position: 'absolute',
                    width: '16px',
                    height: '16px',
                    left: '0',
                    top: '5px',
                    borderLeft: `2px solid ${color}`,
                    borderTop: `2px solid ${color}`,
                    borderTopLeftRadius: '8px',
                    zIndex: 1
                  }}/>
                )}
              </>
            )}
          </div>
        ),
        children: (
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              paddingLeft: isMainBranch ? 0 : '16px',
              marginTop: '-2px',
              cursor: 'pointer'
            }}
            onClick={() => handleCommitClick(commit)}
          >
            <div style={{
              padding: '3px 10px',
              fontSize: '14px',
              border: `2px solid ${color}`,
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
              gap: '8px',
              color: textColor,
              fontSize: '15px',
              fontWeight: 400
            }}>
              <span style={{ 
                fontFamily: 'monospace',
                marginRight: '4px'
              }}>
                {commit.commit_hash?.substring(0, 7)}
              </span>
              <span style={{ color: '#94A3B8' }}>{truncateMessage(commit.message)}</span>
              <span style={{ color: '#94A3B8' }}>- {commit.author?.name}</span>
            </div>
          </div>
        )
      };
    });
  };

  return (
    <div style={{ 
      backgroundColor: '#1e1e2e',
      height: '100%',
      width: '100%',
      position: 'relative',
      top: 0,
      left: 0,
      padding: '20px 20px',
      margin: '24px',
      borderRadius: '8px',
      margin: 0
    }}>
      <div style={{ 
        height: 'calc(100vh - 60px)',
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden'
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
          border-left: 2px solid #334155;
          left: 4px;
          height: calc(100% + 10px) !important;
          top: 0 !important;
          opacity: 0.4;
        }
        
        .ant-timeline-item {
          margin: 0 !important;
          padding: 0 0 12px 0 !important;
          min-height: 12px !important;
          position: relative;
          cursor: pointer;
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
          width: 12px !important;
          height: 12px !important;
        }
        
        .ant-timeline-item-content {
          margin: 0 0 0 16px !important;
          padding: 0 !important;
          min-height: 12px !important;
          line-height: 1.4 !important;
        }
      `}</style>
    </div>
  );
};

export default GithubBranchComponent;