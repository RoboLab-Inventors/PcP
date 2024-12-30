import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import ExImButton from '../ExImButton/ExImButton';

const ResponsiveBottomDrawer = () => {
  const [isFullOpen, setIsFullOpen] = useState(false);

  const toggleDrawer = () => {
    setIsFullOpen(!isFullOpen);
  };

  return (
    <>
      {/* Backdrop */}
      {isFullOpen && (
        <Backdrop
          open={isFullOpen}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: (theme) => theme.zIndex.drawer - 1,
            transition: 'background-color 0.3s ease-in-out',
          }}
          onClick={toggleDrawer} // Clicking the backdrop closes the drawer
        />
      )}

      {/* Drawer */}
      <Drawer
        anchor="bottom"
        open={true}
        variant="persistent"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            position: 'absolute',
            backgroundColor: 'rgba(15, 6, 6, 0.121)',
            borderTopRightRadius: '20px',
            borderTopLeftRadius: '20px',
            height: isFullOpen ? '20%' : '7%',
            width: '100%',
            transition: 'height 0.3s ease-in-out',
            overflowY: 'hidden',
          },
          '& .MuiDrawer-root': {
            position: 'absolute',
            bottom: 0,
            left: 0,
          },
        }}
      >
        {/* Drawer Handle */}
        <Box
          onClick={toggleDrawer}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            borderTopRightRadius: '20px',
            borderTopLeftRadius: '20px',
            py: 1,
          }}
        >
          <Box
            sx={{
              width: '20%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="drawer-handle"
          >
            {[1, 2, 3].map((line) => (
              <Box
                key={line}
                sx={{
                  width: '60%',
                  height: '3px',
                  backgroundColor: 'fontColor.main',
                  my: 0.5,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Drawer Content */}
        <Box
          sx={{
            height: 'calc(100% - 50px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: '100%',
              opacity: isFullOpen ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            <ExImButton primaryContent="Export" secondaryContent="Size: 12kt" />
            <ExImButton primaryContent="Import" secondaryContent="Import" />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ResponsiveBottomDrawer;
