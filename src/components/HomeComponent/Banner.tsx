import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { EffectFade, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { GetHomePageBannerListResponse } from "@atoms/homePageBannerListAtom";

interface BannerProps {
	banners?: GetHomePageBannerListResponse["data"]["banner_sliders"];
}

const myLoader = ({ src, width, quality }: any) => {
	return `https://api.loiheng.duckdns.org${src}?q=${quality || 75}`;
};

export const Banner = (props: BannerProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<div>
			<Swiper
				spaceBetween={30}
				effect={"fade"}
				navigation={true}
				pagination={{
					clickable: true,
				}}
				modules={[EffectFade, Navigation, Pagination]}
				className="mySwiper"
			>
				{props.banners?.map((b) => {
					return (
						<SwiperSlide key={b.id}>
							<Box
								className=" bg-[#DEE0DF]"
								width={"100%"}
								height={isMobile ? "250px" : "400px"}
								position={"relative"}
							>
								<Image
									loader={myLoader}
									style={{ objectFit: "cover" }}
									src={b.image}
									alt="Banner Slider"
									fill
									sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
								/>
							</Box>
						</SwiperSlide>
					);
				})}
			</Swiper>
			{/* <Slider {...homeSlide}>
						{banner?.banner_sliders.map((ban, index) => {
							return (
								<Box
									key={index}
									sx={{
										position: "relative",
										width: "100%",
										height: isMobile ? "250px" : "400px",
									}}
								>
									{!ban.image ? (
										<Skeleton
											variant="rectangular"
											animation={"wave"}
											width={"100%"}
											height={"400px"}
										/>
									) : (
										<Image
											loader={myLoader}
											src={ban.image}
											alt="Banner Slider"
											fill
											sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
										/>
									)}
								</Box>
							);
						})}
					</Slider> */}
		</div>
	);
};
