import useFetch from "../../hooks/useFetch.jsx";
import Loading from "../../shared/Loading/Loading.jsx";
import Alert from "react-bootstrap/Alert";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function Categories() {
    const { data, isLoading, error } = useFetch(`${import.meta.env.VITE_BURL}/categories/active`);

    if (isLoading) return <Loading />;

    return (
        <div className="container py-4">
            {error && (<Alert variant="danger" className="text-center fw-bold shadow-sm"> ⚠️ Error: {error} </Alert>)}
            <h2 className="text-center fw-bold">Categories</h2>
            <div className="d-flex align-items-center" style={{ position: "relative" }}>
                <div className="swiper-button-prev text-black" style={{ fontSize: "30px", cursor: "pointer", flexShrink: 0, marginRight: "10px", }}></div>

                <Swiper modules={[Navigation, Autoplay]} spaceBetween={0} slidesPerView={4} navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', }}
                    autoplay={{ delay: 3000 }} loop={true}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        576: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        992: { slidesPerView: 4 },
                        1200: { slidesPerView: 5 },
                    }}
                    pagination={false} style={{ flexGrow: 1 }} >
                    {data?.categories?.map((u) => (
                        <SwiperSlide key={u._id} className="text-center" >
                            <img src={u.image?.secure_url} alt={u.name} style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%", marginBottom: "10px", marginTop: "30px", border: "3px solid #ffc107", }} />
                            <h6 className="fw-semibold text-dark mb-0">{u.name}</h6>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-button-next text-black" style={{ fontSize: "30px", cursor: "pointer", flexShrink: 0, marginLeft: "10px", }}></div>
            </div>
        </div>
    );
}
