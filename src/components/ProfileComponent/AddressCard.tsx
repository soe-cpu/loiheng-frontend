import {
	Box,
	colors,
	Typography,
	Divider,
	Stack,
	Tooltip,
	IconButton,
	Grid,
	styled,
} from "@mui/material";
import addressStore, { Address } from "@stores/addressStore";
import { useSession } from "next-auth/react";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";

export const AddressCard = (props: Address) => {
	const removeAddress = addressStore((store) => store.removeAddress);

	const { data } = useSession();

	const add = props;
	return (
		<Grid item xs={12} md={6} lg={4}>
			<Box sx={{ border: `1px solid ${colors.grey[300]}` }}>
				<Typography sx={{ p: 2 }}>{add?.full_name}</Typography>
				<Divider />
				<Box
					sx={{
						p: 2,
						display: "flex",
						flexDirection: "column",
						gap: 1,
					}}
				>
					<Typography variant="subtitle2">
						Name: <StyledSpan>{add.full_name}</StyledSpan>
					</Typography>
					<Typography variant="subtitle2">
						Address Type: <StyledSpan>home</StyledSpan>
					</Typography>
					<Typography variant="subtitle2">
						City: <StyledSpan>{add.city}</StyledSpan>
					</Typography>
					<Typography variant="subtitle2">
						Township: <StyledSpan>{add.township}</StyledSpan>
					</Typography>
					<Typography variant="subtitle2">
						Region: <StyledSpan>{add.region}</StyledSpan>
					</Typography>
					<Typography variant="subtitle2">
						Phone Number: <StyledSpan>{add.phone}</StyledSpan>
					</Typography>
				</Box>
				<Divider />
				<Box sx={{ p: 2, display: "flex", justifyContent: "end" }}>
					<Stack direction={"row"} spacing={1}>
						{/* <Tooltip title={"Edit Address"} arrow placement="top">
							<IconButton
								sx={{
									border: `1px solid ${colors.blue[600]}`,
									color: colors.blue[600],
									transition: "0.4s",
									"&:hover": {
										backgroundColor: colors.blue[600],
										color: "#fff",
									},
								}}
							>
								<BiEdit style={{ fontSize: 16 }} />
							</IconButton>
						</Tooltip> */}
						<Tooltip title={"Delete Address"} arrow placement="top">
							<IconButton
								sx={{
									border: `1px solid ${colors.red[600]}`,
									color: colors.red[600],
									transition: "0.4s",
									"&:hover": {
										backgroundColor: colors.red[600],
										color: "#fff",
									},
								}}
								onClick={() => {
									if (data) removeAddress(data, props.id);
								}}
							>
								<ImBin style={{ fontSize: 16 }} />
							</IconButton>
						</Tooltip>
					</Stack>
				</Box>
			</Box>
		</Grid>
	);
};

const StyledSpan = styled("span")(({ theme }) => ({
	fontSize: 14,
	color: colors.grey[500],
}));
