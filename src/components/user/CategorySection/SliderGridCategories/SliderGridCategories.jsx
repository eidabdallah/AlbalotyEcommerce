import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import styles from "./SliderGridCategories.module.css";
export default function SliderGridCategories({ title, data = [], linkPath = null }) {
    return (
        <>  <h2 className={`text-center fw-bold my-5 ${styles.title}`}>
            {title}
        </h2>
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
                {data.map((item) => {
                    const content = (
                        <Card className={styles.card}>
                            <div className={styles.cardImgWrapper}>
                                <Card.Img
                                    variant="top"
                                    src={item.image?.secure_url}
                                    alt={item.name}
                                    className={styles.cardImg}
                                />
                            </div>
                            <Card.Body>
                                <Card.Title className={styles.cardTitle}>{item.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    );
                    return (
                        <SwiperSlide key={item._id}>
                            {linkPath ? (
                                <Link
                                    to={`${linkPath}/${item._id}`}
                                    className="text-decoration-none"
                                >
                                    {content}
                                </Link>
                            ) : (
                                content
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    )
}
