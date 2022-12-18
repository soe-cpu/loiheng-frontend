import {
	Box,
	Button,
	colors,
	Divider,
	Grid,
	InputBase,
	Stack,
	styled,
	Typography,
} from "@mui/material";
import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Session } from "next-auth";
import { Me } from "pages/api/auth/[...nextauth]";

interface ProfileComponentProps {
	me: Me;
}

const ProfileComponent = (props: ProfileComponentProps) => {
	const { me } = props;
	return (
		<Box>
			<Stack direction={"row"} alignItems={"center"} spacing={1} sx={{ p: 2 }}>
				<AccountCircleOutlinedIcon />
				<Typography variant="h6">My Profile</Typography>
			</Stack>
			<Divider />
			<Box sx={{ p: 2 }}>
				<Grid container spacing={4} alignItems={"center"}>
					<Grid item xs={4}>
						<Typography sx={{ fontWeight: 500 }}>Email :</Typography>
					</Grid>
					<Grid item xs={8}>
						<StyledInputBase
							sx={{ border: `1px solid ${colors.grey[300]}` }}
							value={me.data?.email}
							fullWidth
							disabled
						/>
					</Grid>
					<Grid item xs={4}>
						<Typography sx={{ fontWeight: 500 }}>Phone Number :</Typography>
					</Grid>
					<Grid item xs={8}>
						<StyledInputBase
							value={me.data?.phone_no}
							sx={{ border: `1px solid ${colors.grey[300]}` }}
							fullWidth
							disabled
						/>
					</Grid>
					<Grid item xs={4}>
						<Typography sx={{ fontWeight: 500 }}>Password :</Typography>
					</Grid>
					<Grid item xs={8}>
						<Button disabled>Change Password?</Button>
					</Grid>
					<Grid item xs={4}>
						<Typography sx={{ fontWeight: 500 }}>Display Name :</Typography>
					</Grid>
					<Grid item xs={8}>
						<StyledInputBase
							value={me.data?.fullname}
							sx={{ border: `1px solid ${colors.grey[300]}` }}
							fullWidth
							disabled
						/>
					</Grid>
					<Grid item xs={4}>
						<Typography sx={{ fontWeight: 500 }}>Gender :</Typography>
					</Grid>
					<Grid item xs={8}>
						<StyledInputBase
							value={me.data?.gender}
							sx={{ border: `1px solid ${colors.grey[300]}` }}
							disabled
							fullWidth
						/>
					</Grid>
					{/* <Grid item xs={12}>
						<Stack direction={"row"} justifyContent={"end"}>
							<Button
								sx={{
									backgroundColor: colors.blue[500],
									color: "#fff",
									"&:hover": {
										backgroundColor: colors.blue[600],
									},
								}}
							>
								Update
							</Button>
						</Stack>
					</Grid> */}
				</Grid>
			</Box>
		</Box>
	);
};

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	border: `1px solid ${colors.grey[300]}`,
	padding: "4px 10px",
}));

export default ProfileComponent;
