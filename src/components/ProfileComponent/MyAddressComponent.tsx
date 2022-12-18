import {
	Box,
	Button,
	colors,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	styled,
	Switch,
	TextField,
	Tooltip,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { BiEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";
import StyledModalBox from "@common/StyledModalBox";
import addressStore from "@stores/addressStore";
import { useSession } from "next-auth/react";
import { AddressCard } from "./AddressCard";
import toast from "react-hot-toast";

const MyAddressComponent = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [addressType, setAddressType] = React.useState("");
	const [switchState, setswitchState] = useState<boolean>(false);

	const handleChange = (event: SelectChangeEvent) => {
		setAddressType(event.target.value as string);
	};

	const label = { inputProps: { "aria-label": "Switch demo" } };

	const { data: session } = useSession();
	const fetch = addressStore((store) => store.fetch);
	const addressData = addressStore((store) => store.address);
	const addAddress = addressStore((store) => store.addAddress);
	const isSaving = addressStore((store) => store.isSaving);

	const fullNameRef = useRef<HTMLInputElement>(null);
	const addressRef = useRef<HTMLInputElement>(null);
	const cityRef = useRef<HTMLInputElement>(null);
	const townshipRef = useRef<HTMLInputElement>(null);
	const regionRef = useRef<HTMLInputElement>(null);
	const phoneRef = useRef<HTMLInputElement>(null);

	const save = () => {
		const fullname = fullNameRef.current?.value;
		const street_address = addressRef.current?.value;
		const city = cityRef.current?.value;
		const township = townshipRef.current?.value;
		const region = regionRef.current?.value;
		const phone = phoneRef.current?.value;
		const address_type = addressType;
		const is_default = switchState;

		if (session) {
			const res = addAddress(
				session,
				fullname,
				phone,
				city,
				township,
				region,
				address_type,
				street_address,
				is_default
			).then((res) => {
				if (res) {
					fetch(session);
					handleClose();
					toast.success("Address created successfully!")
				}
			});
		} else {
			console.log("something wrong");
		}
		// console.log(session?.token);
	};

	React.useEffect(() => {
		if (session) {
			fetch(session);
		}
	}, [session, fetch]);

	return (
		<Box
		>
			<Stack
				direction={"row"}
				justifyContent={"space-between"}
				alignItems={"center"}
				sx={{ p: 2 }}
			>
				<Stack direction={"row"} alignItems={"center"} spacing={1}>
					<LocationOnOutlinedIcon />
					<Typography variant="h6"> My Addresses</Typography>
				</Stack>
				<Button
					variant="contained"
					sx={{
						backgroundColor: colors.blue[500],
						color: "#fff",
						boxShadow: "0px 0px 0px #fff",
						"&:hover": {
							backgroundColor: colors.blue[600],
						},
					}}
					onClick={handleOpen}
				>
					Add Address
				</Button>
				{/* Add Address Modal start */}
				<StyledModalBox open={open} handleClose={handleOpen}>
					<Box
						sx={{
							width: isMobile ? 340 : 550,
							display: "flex",
							flexDirection: "column",
							gap: 2,
						}}
					>
						<Stack>
							<Typography variant="h6">Address adding</Typography>
							<Typography variant="caption">
								Set as default address?{" "}
								<Switch
									{...label}
									value={switchState}
									onClick={() => setswitchState(!switchState)}
								/>
							</Typography>
						</Stack>
						<Divider />
						<Stack spacing={2}>
							<TextField
								type={"text"}
								id="outlined-basic"
								label="Name"
								variant="outlined"
								inputRef={fullNameRef}
								required
							/>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">
									Address Type
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={addressType}
									label="Address Type"
									onChange={handleChange}
									required
								>
									<MenuItem value={1}>Home</MenuItem>
									<MenuItem value={2}>Work</MenuItem>
									<MenuItem value={3}>Address 1</MenuItem>
									<MenuItem value={4}>Address 2</MenuItem>
									<MenuItem value={5}>Address 3</MenuItem>
								</Select>
							</FormControl>
							<TextField
								type={"text"}
								id="outlined-basic"
								label="Address"
								variant="outlined"
								inputRef={addressRef}
							/>
							<Stack direction={"row"} spacing={2}>
								<TextField
									type={"text"}
									id="outlined-basic"
									label="Region"
									variant="outlined"
									inputRef={regionRef}
									required
								/>
								<TextField
									type={"text"}
									id="outlined-basic"
									label="City"
									variant="outlined"
									inputRef={cityRef}
									required
								/>
								<TextField
									type={"text"}
									id="outlined-basic"
									label="Township"
									variant="outlined"
									inputRef={townshipRef}
									required
								/>
							</Stack>
							<TextField
								type={"text"}
								id="outlined-basic"
								label="Phone"
								variant="outlined"
								inputRef={phoneRef}
								required
							/>
						</Stack>
						<Divider />
						<Stack direction={"row"} spacing={2} justifyContent={"end"}>
							<Button
								variant="contained"
								color="error"
								onClick={handleClose}
								sx={{ boxShadow: "0px 0px 0px #fff" }}
							>
								Cancel
							</Button>
							<Button
								variant="contained"
								sx={{
									color: "#fff",
									backgroundColor: theme.palette.primary.main,
									boxShadow: "0px 0px 0px #fff",
									"&:hover": {
										backgroundColor: theme.palette.primary.main,
									},
								}}
								onClick={save}
								disabled={isSaving}
							>
								Save
							</Button>
						</Stack>
					</Box>
				</StyledModalBox>
				{/* Add Address Modal end */}
				
			</Stack>
			<Divider />
			<Box sx={{ p: 2 }}>
				<Grid container spacing={2}>
					{addressData?.map((add, index) => {
						return <AddressCard key={add.id} {...add} />;
					})}
				</Grid>
			</Box>
		</Box>
	);
};

export default MyAddressComponent;
