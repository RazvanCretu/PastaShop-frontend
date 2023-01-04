import { ITEMS } from "../../queries";
import client from "../../utils/apolloClient";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import {
  addToCart,
  decreaseCount,
  removeFromCart,
  selectCart,
} from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const StorePage = ({ data }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectCart);

  return (
    <Container sx={{ paddingTop: "100px" }}>
      {data.map((item, i) => {
        const { image, name, shortDescription, price } = item.attributes;
        return (
          <Card key={i} sx={{ mb: 2 }}>
            <CardHeader
              sx={{
                "& .MuiCardHeader-action": {
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "center",
                },
              }}
              avatar={
                <Avatar
                  src={`http://localhost:1337${image.data.attributes.url}`}
                />
              }
              title={name}
              subheader={shortDescription}
              action={
                <>
                  {cartItems[name] && (
                    <>
                      <IconButton
                        onClick={() => dispatch(removeFromCart({ name }))}
                        color="error"
                        size="small"
                      >
                        <ClearRoundedIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => dispatch(decreaseCount({ name }))}
                        color="error"
                      >
                        <RemoveRoundedIcon />
                      </IconButton>
                      <Typography>{cartItems[name].qty}</Typography>
                    </>
                  )}
                  <IconButton
                    onClick={() =>
                      dispatch(addToCart({ id: item.id, name, price }))
                    }
                    color="success"
                  >
                    <AddShoppingCartRoundedIcon />
                  </IconButton>
                </>
              }
            />
          </Card>
        );
      })}
    </Container>
  );
};

StorePage.getInitialProps = async (ctx) => {
  const { data } = await client.query({
    query: ITEMS,
  });

  return {
    data: data.items.data,
  };
};

export default StorePage;
