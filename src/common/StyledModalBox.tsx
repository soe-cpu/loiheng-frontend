import { Box, Fade, Modal, styled, useMediaQuery } from "@mui/material";

const StyledBox = styled(Box)<{
  isMobile?: boolean;
}>(({ theme, isMobile = useMediaQuery(theme.breakpoints.down("sm")) }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
}));

interface StyledModalBoxInterface {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}

const StyledModalBox = (props: StyledModalBoxInterface) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <StyledBox>{props.children}</StyledBox>
      </Fade>
    </Modal>
  );
};

export default StyledModalBox;
