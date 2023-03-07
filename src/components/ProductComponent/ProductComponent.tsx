import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Checkbox,
	Chip,
	colors,
	Container,
	Divider,
	Fade,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Pagination,
	Select,
	SelectChangeEvent,
	Slider,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AppsIcon from "@mui/icons-material/Apps";
import ListIcon from "@mui/icons-material/List";
import ProductCard from "@common/ProductCard";
import useAllProduct from "@apis/useAllProduct";
import { GetProductListResponse } from "@atoms/productListAtom";
import { GetAllBrands, GetAllCategories } from "pages/product";
import { useState } from "react";
import { SubCategory } from "@interfaces/sub-category.interface.";
import HorizontalProductCard from "@common/HorizontalProductCard";
import useFilterQuery from "@hooks/useFilterQuery";
import queryString from "query-string";
import { useRouter } from "next/router";

enum SortEnum {
	NONE = "",
	IS_FEATURE = "is_feature_product",
	LOWEST_PRICE = "lowest_price",
	HIGHEST_PRICE = "highest_price",
}

const myLoaderGif = ({ src, width, quality }: any) => {
	return `${src}?q=${quality || 75}`;
};

const ProductComponent = (props: {
	brands: GetAllBrands;
	categories: GetAllCategories;
}) => {
	const [show, setShow] = useState<boolean>(true);
	const [sort, setSort] = React.useState(SortEnum.NONE);
	const [prices, setPrices] = React.useState<number | number[]>([0, 1000]);
	const [minMaxPrices, setMinMaxPrices] = React.useState<number[]>([0, 1000]);

	// const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
	// const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [categories, setCategories] = useState<SubCategory[]>([]);
	const [keyword, setKeyword] = useState<string>("");

	const { brands: selectedBrands, categories: selectedCategories } =
		useFilterQuery();
	const { data, error, isValidating } = useAllProduct(
		selectedCategories,
		selectedBrands,
		keyword,
		page,
		15,
		sort
	);

	const [product, setProduct] =
		React.useState<GetProductListResponse["data"]>();

	const theme = useTheme();
	const router = useRouter();

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const handleBrandsSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = e.target;
		const id = parseInt(value);
		if (checked) {
			// setSelectedBrands([...selectedBrands, id]);
			const url = queryString.stringify(
				{ brands: [...selectedBrands, id], categories: selectedCategories },
				{ arrayFormat: "comma" }
			);
			console.log(url);
			router.push("?" + url, "?" + url, {
				shallow: true,
			});
		} else {
			const url = queryString.stringify(
				{
					brands: selectedBrands.filter((val) => val !== id),
					categories: selectedCategories,
				},
				{ arrayFormat: "comma" }
			);
			router.push("?" + url, "?" + url, {
				shallow: true,
			});
			// setSelectedBrands(selectedBrands.filter((val) => val !== id));
		}
	};

	const handleCategoriesSelection = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value, checked } = e.target;
		const id = parseInt(value);
		if (checked) {
			const url = queryString.stringify(
				{ categories: [...selectedCategories, id], brands: selectedBrands },
				{ arrayFormat: "comma" }
			);
			router.push("?" + url, "?" + url, {
				shallow: true,
			});
		} else {
			const url = queryString.stringify(
				{
					categories: selectedCategories.filter((val) => val !== id),
					brands: selectedBrands,
				},
				{ arrayFormat: "comma" }
			);
			router.push("?" + url, "?" + url, {
				shallow: true,
			});
		}
	};

	const handleChange = (event: SelectChangeEvent) => {
		if (event.target.value) {
			setSort(event.target.value as SortEnum);
		}
	};

	const handlePriceRange = (e: Event, value: number | number[]) => {
		setPrices(value);
	};

	const handlePage = (e: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handleClickGrid = () => {
		setShow(true);
	};
	const handleClickList = () => {
		setShow(false);
	};

	React.useEffect(() => {
		if (data) {
			const min = Math.min(...data.data.products.map((data) => data.price));
			const max = Math.max(...data.data.products.map((data) => data.price));
			setProduct(data.data);
			setMinMaxPrices([min, max]);
			setPrices([min, max]);
			setTotal(data.data.pagination.last_page);
			setPage(data.data.pagination.current_page);
		}

		if (props.categories) {
			const list = props.categories.data.categories
				.map((category) => category.sub_category)
				.flat();
			setCategories(list);
		}
	}, [data, setProduct, props]);

	React.useEffect(() => {
		const keyword = router.query.keyword as string;
		if (keyword) {
			setKeyword(keyword);
		}
	}, [router]);

	return (
		<Box sx={{ py: 2 }}>
			<Container maxWidth={"lg"}>
				<Grid container spacing={2}>
					<Grid item xs={12} lg={3}>
						<Stack spacing={2}>
							<Box>
								<Accordion
									elevation={0}
									defaultExpanded={true}
									sx={{ border: `1px solid ${colors.grey[300]}`, p: 0 }}
								>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography>CATEGORIES</Typography>
									</AccordionSummary>
									<AccordionDetails sx={{ p: 0, pl: 1 }}>
										<Box
											sx={{
												height: "220px",
												position: "relative",
												overflow: "scroll",
											}}
										>
											{categories.map((category) => {
												return (
													<FormGroup key={category.id}>
														<FormControlLabel
															control={
																<Checkbox
																	value={category.id}
																	checked={
																		selectedCategories.indexOf(category.id) !==
																		-1
																	}
																	onChange={(e) => handleCategoriesSelection(e)}
																/>
															}
															label={category.name}
														/>
													</FormGroup>
												);
											})}
										</Box>
									</AccordionDetails>
								</Accordion>
							</Box>
							<Box>
								<Accordion
									elevation={0}
									defaultExpanded={true}
									sx={{ border: `1px solid ${colors.grey[300]}` }}
								>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography>BRANDS</Typography>
									</AccordionSummary>
									<AccordionDetails sx={{ p: 0, pl: 1 }}>
										<Box
											sx={{
												height: "220px",
												position: "relative",
												overflow: "scroll",
											}}
										>
											{props.brands.data.brands.map((brand) => {
												return (
													<FormGroup key={brand.id}>
														<FormControlLabel
															control={
																<Checkbox
																	value={brand.id}
																	checked={
																		selectedBrands.indexOf(brand.id) !== -1
																	}
																	onChange={(e) => handleBrandsSelection(e)}
																/>
															}
															label={brand.name}
														/>
													</FormGroup>
												);
											})}
										</Box>
									</AccordionDetails>
								</Accordion>
							</Box>
							<Box sx={{ border: `1px solid ${colors.grey[300]}` }}>
								<Typography sx={{ p: 2 }}>PRICE RANGE</Typography>
								<Divider />
								<Box sx={{ p: 2 }}>
									<Slider
										getAriaLabel={() => "Price Range"}
										value={prices}
										step={100}
										min={minMaxPrices[0]}
										max={minMaxPrices[1]}
										valueLabelDisplay="auto"
										onChange={handlePriceRange}
										// getAriaValueText={"Price Range"}
									/>
								</Box>
							</Box>
						</Stack>
					</Grid>
					<Grid item xs={12} lg={9}>
						<Stack
							direction={"row"}
							justifyContent={"space-between"}
							alignItems={"center"}
						>
							<Box>
								<Typography variant="h6">Product Lists</Typography>
							</Box>
							<Box sx={{ display: "flex", gap: 2 }}>
								<Stack direction={"row"} alignItems={"center"}>
									<Typography>Sort By: </Typography>
									<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
										<InputLabel id="demo-select-small">Type</InputLabel>
										<Select
											labelId="demo-select-small"
											id="demo-select-small"
											value={sort}
											label="Age"
											onChange={handleChange}
										>
											<MenuItem value={SortEnum.NONE}>
												<em>None</em>
											</MenuItem>
											<MenuItem value={SortEnum.IS_FEATURE}>
												Feature Product
											</MenuItem>
											<MenuItem value={SortEnum.LOWEST_PRICE}>
												Lowest Price
											</MenuItem>
											<MenuItem value={SortEnum.HIGHEST_PRICE}>
												Highest Price
											</MenuItem>
										</Select>
									</FormControl>
								</Stack>
								<Stack direction={"row"} alignItems={"center"}>
									<Typography>View: </Typography>
									<Box sx={{ display: "flex" }}>
										<IconButton onClick={handleClickGrid}>
											<AppsIcon
												fontSize="small"
												sx={{ color: show == true ? colors.blue[500] : "" }}
											/>
										</IconButton>
										<IconButton onClick={handleClickList}>
											<ListIcon
												fontSize="small"
												sx={{ color: show == true ? "" : colors.blue[500] }}
											/>
										</IconButton>
									</Box>
								</Stack>
							</Box>
						</Stack>
						<Box sx={{ display: show == true ? "block" : "none" }}>
							<Grid container spacing={1}>
								{product ? (
									product.products.length <= 0 ? (
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												width: "100%",
												flexDirection: "column",
											}}
										>
											<Box
												sx={{
													position: "relative",
													width: "300px",
													height: "300px",
												}}
											>
												<Image
													src={"/no-prod.gif"}
													alt="Shipping Gif"
													loader={myLoaderGif}
													fill
													sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
												/>
											</Box>
											<Typography>No product found!</Typography>
										</Box>
									) : (
										product.products.map((prod, index) => {
											return (
												<Grid item xs={12} md={3} key={index}>
													<ProductCard data={prod} />
												</Grid>
											);
										})
									)
								) : (
									""
								)}
							</Grid>
						</Box>
						<Box sx={{ display: show == false ? "block" : "none" }}>
							{product ? (
								product.products.length <= 0 ? (
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											width: "100%",
											flexDirection: "column",
										}}
									>
										<Box
											sx={{
												position: "relative",
												width: "300px",
												height: "300px",
											}}
										>
											<Image
												src={"/no-prod.gif"}
												alt="Shipping Gif"
												loader={myLoaderGif}
												fill
												sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
											/>
										</Box>
										<Typography>No product found!</Typography>
									</Box>
								) : (
									<Stack spacing={1}>
										{product?.products.map((prod, index) => {
											return (
												<Box key={index}>
													<HorizontalProductCard data={prod} />
												</Box>
											);
										})}
									</Stack>
								)
							) : (
								""
							)}
						</Box>
						<Stack
							sx={{ paddingY: theme.spacing(5), marginTop: theme.spacing(5) }}
							justifyContent={"center"}
							alignItems={"center"}
						>
							<Pagination
								count={total}
								page={page}
								onChange={handlePage}
								variant="outlined"
								color="primary"
								showFirstButton
								showLastButton
								size={isMobile ? "medium" : "large"}
							/>
						</Stack>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default ProductComponent;
