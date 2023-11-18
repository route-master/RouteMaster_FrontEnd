/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { deletePlan } from 'store/Slices/plans/thunks';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;

function PlanMenu(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { planGroupId } = useParams<{ planGroupId: string }>();
  const dispatch = useAppDispatch();
  const inviteUrl = `${window.location.origin}/invite/${planGroupId}`;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (
      confirm('삭제된 플랜은 복구될 수 없습니다. 삭제하시겠습니까?') &&
      planGroupId
    ) {
      dispatch(deletePlan({ planId: parseInt(planGroupId, 10) }));
      location.href = '/plan-list';
    }
  };

  const options = [{ title: '지우기', onClick: handleDelete }];

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <CopyToClipboard
          text={inviteUrl}
          onCopy={() => alert('링크가 복사되었습니다! 친구에게 공유해보세요!')}
        >
          <MenuItem onClick={handleClose}>새 멤버 초대하기</MenuItem>
        </CopyToClipboard>
        {options.map((option) => (
          <MenuItem
            key={option.title}
            onClick={() => {
              option.onClick();
              handleClose();
            }}
          >
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default PlanMenu;
