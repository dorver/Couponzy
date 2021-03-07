import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Coupon from '../components/Coupon';
import Shop from '../components/Shop';
import Message from '../components/Message';
import Loader from '../components/Loader';
//import coupons from '../coupons';
import { listCoupons } from '../actions/couponActions';
import{listShops} from '../actions/shopActions'
import { render } from 'react-dom';
import { listCouponDetails } from '../actions/couponActions';
import axios from 'axios';
const HomeScreen = () => {
  const [shops,setShops]= useState([]);
  const [couponTypes,setCouponTypes]= useState([]);
  const [range,setRange]= useState("");
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const couponList = useSelector((state) => state.couponList);
  const { loading, error, coupons } = couponList;

useEffect(()=>{
const fetchShops=async()=>{
  const {data} = await axios.get('/api/shops')
  setShops(data)
}
fetchShops()
},[])
useEffect(()=>{
  const fetchCouponTypes=async()=>{
    const {data} = await axios.get('/api/couponsTypes')
    setCouponTypes(data)
  }
  fetchCouponTypes()
  },[])



  useEffect(() => {
    dispatch(listCoupons());
  }, [dispatch]);
  
  // const flit=this.coupons.filter((coupon)=>{
    
  //   return coupon.name.indexOf(search)!==-1
  // });
  const updateSearch = (event) => setSearch(event.target.value);
  const updateRange = (event) => setRange(event.target.value);
  const getShopname=((shopName)=>{
    return shops.filter((shop)=>{return shopName==shop._id});
    
  });
  const getCouponTypeName=((CouponTypeid)=>{
    return couponTypes.filter((CouponType)=>{return CouponTypeid==CouponType._id});
    
  });
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>קופונים אחרונים</h1>
      <div>
        <Row>
        
        <Col><p >חיפוש לפי שם מוצר, חנות ...</p>
        <input type="text" className="mr-sm-2 ml-sm-5" value={search} onChange={updateSearch.bind(this)}></input>
        </Col>
        <Col>
        <p >  חיפוש לפי מחיר מ-0₪ עד </p>
        <input type="text" className="mr-sm-2 ml-sm-5" value={range} onChange={updateRange.bind(this)}></input>
        </Col>
        <Col>
        <p className="event_desc">{range}</p>
        <input type="range" min="0" max="1000" className="slider"  defaultValue="0" id="myRange" onChange={updateRange.bind(this)}></input>
        </Col>
        </Row>
      </div>
  {/*returns the shop*/ }    
{/* <Row>
  {shops.map((shop)=>(
    <Col>key={shop._id}
    <Shop shop={shop}></Shop>    
    </Col>
  ))

  }
</Row> */}
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {coupons.filter((coupon)=>{
        var shpname=getShopname(coupon.shop)[0];
        var typname=getCouponTypeName(coupon.couponType)[0];
        //console.log(getCouponTypeName(coupon.couponType)[0].name.toLowerCase().toString());
        var x=coupon.newPrice.toString().indexOf(search)!==-1;
        var y=coupon.name.toString().indexOf(search)!==-1;
        if(range==""||range==0){
           if(y)
            return y;
          if(shpname.shopName.toLowerCase().toString().indexOf(search.toLowerCase())!==-1)
            return shpname.shopName.toLowerCase().toString().indexOf(search.toLowerCase())!==-1;
          if(typname.name.toLowerCase().toString().indexOf(search.toLowerCase())!==-1)
            return typname.name.toLowerCase().toString().indexOf(search.toLowerCase())!==-1;
        }
        else{
          if(y&&coupon.newPrice<=range)
            return y;
          if(shpname.shopName.toLowerCase().toString().indexOf(search.toLowerCase())!==-1&&coupon.newPrice<=range)
            return shpname.shopName.toLowerCase().toString().indexOf(search.toLowerCase())!==-1;
          if(typname.name.toLowerCase().toString().indexOf(search.toLowerCase())!==-1&&coupon.newPrice<=range)
            return typname.name.toLowerCase().toString().indexOf(search.toLowerCase())!==-1;
        }
          })
          .map((coupon) => (
            <Col key={coupon._id} sm={12} md={6} lg={4} xl={3}>
              <Coupon coupon={coupon} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
          
};


export default HomeScreen;
