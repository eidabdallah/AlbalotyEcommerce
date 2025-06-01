import useFetch from "../../hooks/useFetch.jsx";
import Loading from "../../shared/Loading/Loading.jsx";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "./Categories.module.css";

export default function Categories() {
  const { data, isLoading, error } = useFetch(`${import.meta.env.VITE_BURL}/categories/active`);

  if (isLoading) return <Loading />;
  return (
    <div className="container py-5">


      <h2 className={`text-center fw-bold ${styles.title}`}>
        Explore Categories
      </h2>
      {error && (
        <Alert variant="danger" className="text-center fw-bold shadow-sm">
          ⚠️ Error: {error}
        </Alert>
      )}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={25}
        slidesPerView={4}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
        style={{ padding: "0 10px" }}
      >
        {data?.categories?.map((category) => (
          <SwiperSlide key={category._id}>
            <Card
              className={styles.card}
            >
              <div className={styles.cardImgWrapper}>
                <Card.Img
                  variant="top"
                  src={category.image?.secure_url}
                  alt={category.name}
                  className={styles.cardImg}
                />
              </div>
              <Card.Body>
                <Card.Title className={styles.cardTitle}>
                  {category.name}
                </Card.Title>
              </Card.Body>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
