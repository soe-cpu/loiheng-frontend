import {
  Box,
  Button,
  ButtonProps,
  colors,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Link from "next/link";

const ProductCard = () => {
  return (
    <Box
      sx={{
        border: `1px solid ${colors.grey[300]}`,
        p: 1,
        borderRadius: "4px",
        "&:hover": {
          border: `1px solid ${colors.blue[500]}`,
        },
      }}
    >
      <Link href={"/product/test"} legacyBehavior>
        <StyledLink>
          <Box maxHeight={"180px"}>
            <ProductImage src="/bg1.png" alt={"ProductImage"} />
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 12,
              color: colors.grey[600],
              fontWeight: 500,
              py: 1,
            }}
          >
            Access Point
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 14,
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: { xs: 2, lg: 2 },
              lineClamp: { xs: 2, lg: 2 },
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
            }}
          >
            Parabolic 5 GHz dish antenna with precision alignment mount mANT30
            PA, 4 pack (MTAD-5G-30D3-4PA)
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 13,
              color: colors.grey[700],
              py: 1,
              fontWeight: 500,
            }}
          >
            Ks 130,000
          </Typography>
        </StyledLink>
      </Link>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <AddtoCartButton size="small">Add to Cart</AddtoCartButton>
        <FavButton size={"small"}>
          <FavoriteBorderOutlinedIcon />
        </FavButton>
      </Box>
    </Box>
  );
};

const ProductImage = styled("img")(({ theme }) => ({
  width: "100%",
  objectFit: "cover",
  transition: "transform 0.3s",
  "&:hover": {
    transform: " scale(1.1)",
  },

  // box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2) !important;
}));
const AddtoCartButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(colors.blue[500]),
  width: "100%",
  backgroundColor: colors.blue[500],
  "&:hover": {
    backgroundColor: colors.blue[700],
  },
}));
const FavButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: colors.pink[500],
  borderRadius: "4px",
  border: `1px solid ${colors.pink[500]}`,
  "&:hover": {
    color: "#fff",
    backgroundColor: colors.pink[700],
  },
}));

const StyledLink = styled("a")(({ theme }) => ({
  cursor: "pointer",
}));

export default ProductCard;
