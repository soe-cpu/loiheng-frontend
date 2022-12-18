import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  colors,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AppsIcon from "@mui/icons-material/Apps";
import ListIcon from "@mui/icons-material/List";
import ProductCard from "@common/ProductCard";
import useAllProduct from "@apis/useAllProduct";
import { GetProductListResponse } from "@atoms/productListAtom";

const ProductComponent = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const { data, error, isValidating } = useAllProduct();
  const [product, setProduct] =
    React.useState<GetProductListResponse["data"]>();

  React.useEffect(() => {
    if (data) {
      setProduct(data.data);
    }
  }, [data, setProduct]);

  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth={"lg"}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={3}>
            <Stack spacing={2}>
              <Box>
                <Accordion
                  elevation={0}
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
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Label"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Disabled"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Label"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Disabled"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Label"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Disabled"
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Label"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Disabled"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Label"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Disabled"
                        />
                      </FormGroup>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Box>
                <Accordion
                  elevation={0}
                  sx={{ border: `1px solid ${colors.grey[300]}` }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>BRAND</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0, pl: 1 }}>
                    <Box
                      sx={{
                        height: "220px",
                        position: "relative",
                        overflow: "scroll",
                      }}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Label"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Disabled"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Label"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Disabled"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Label"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Disabled"
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Label"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Disabled"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Label"
                        />
                        <FormControlLabel
                          disabled
                          control={<Checkbox />}
                          label="Disabled"
                        />
                      </FormGroup>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Box sx={{ border: `1px solid ${colors.grey[300]}` }}>
                <Typography sx={{ p: 2 }}>PRICE RANGE</Typography>
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Slider
                    defaultValue={50}
                    aria-label="Default"
                    valueLabelDisplay="auto"
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
                    <InputLabel id="demo-select-small">Age</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography>View: </Typography>
                  <Box sx={{ display: "flex" }}>
                    <IconButton>
                      <AppsIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                      <ListIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Stack>
              </Box>
            </Stack>
            <Grid container spacing={2}>
              {product?.products.map((prod, index) => {
                return (
                  <Grid item xs={12} md={4} key={index}>
                    <ProductCard
                      id={prod.id}
                      name={prod.name}
                      price={prod.price}
                      image={prod.cover_img}
                      category={prod.category[0].name}
                      data={prod}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductComponent;
