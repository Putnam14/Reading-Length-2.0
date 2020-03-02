import React from 'react'
import AdStyles from './styles/AdStyles'

const ads = [
  {
    img:
      'https://images-na.ssl-images-amazon.com/images/G/01/img14/amazon-student/assoc/1amazon-student_associate-textbook-banners-01132014_assoc_468x60.jpg',
    link:
      'https://www.amazon.com/New-Used-Textbooks-Books/b?tag=readleng-20&linkCode=ur1&ie=UTF8&node=465600',
  },
  {
    img:
      'https://images-na.ssl-images-amazon.com/images/G/01/img14/amazon-student/assoc/4amazon-student_associate-textbook-banners-01132014_assoc_468x60.jpg',
    link:
      'https://www.amazon.com/New-Used-Textbooks-Books/b?tag=readleng-20&linkCode=ur1&ie=UTF8&node=465600',
  },
  {
    img:
      'https://images-na.ssl-images-amazon.com/images/G/01/Books/Textbooks/Q22013/AMZ_AC_SellBooks728x90c._V372583383_.jpg',
    link:
      'https://www.amazon.com/b/ref=as_acph_bk_sweep_48_71?tag=readleng-20&linkCode=ur1&ie=UTF8&node=2205237011',
  },
  {
    img:
      'https://images-na.ssl-images-amazon.com/images/G/01/img12/books/associates-graphics/books_adults_summer_assoc_728x90.gif',
    link: 'https://www.amazon.com/summer-reading?tag=readleng-20&linkCode=ur1',
  },
  {
    img:
      'https://images-na.ssl-images-amazon.com/images/G/01/img11/books/associates-offsite/BBOTM_728x90.png',
    link:
      'https://www.amazon.com/b?tag=readleng-20&linkCode=ur1&node=390919011',
  },
  {
    img:
      'https://images-na.ssl-images-amazon.com/images/G/01/Books/grutty/rental/AMZ_AC_SellBooks_728x90a_newused._V396442769_.jpg',
    link: 'https://www.amazon.com/b?tag=readleng-20&linkCode=ur1&node=465600',
  },
  {
    img:
      'https://images-na.ssl-images-amazon.com/images/G/01/audible/associates/tw01_adbl_You_728x90.png',
    link:
      'https://www.amazon.com/dp/B00MTSML3K/?tag=readleng-20&linkCode=ur1&ref=assoc_tag_ph_201&actionCode=AMZGB066010920927Q',
  },
  {
    img:
      'https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2018/img/Prime/XCM_Manual_1132576_Evergreen_Associates_banners_Q32018_728x90_Prime_728X90_1534401353_jpg.jpg',
    link:
      'https://www.amazon.com/amazonprime?tag=readleng-20&linkCode=ur1&_encoding=UTF8&primeCampaignId=prime_assoc_ft',
  },
  {
    img:
      'https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/JoyDelivered/Prime-O_O-728x90-Delivery-1._CB437769727_.jpg',
    link: 'https://www.amazon.com/tryprimefree?tag=readleng-20&linkCode=ur1',
  },
  {
    img:
      'https://images-na.ssl-images-amazon.com/images/G/01/audible/associates/SA32_JFB_728x90.png',
    link:
      'https://www.amazon.com/gp/product/B01DYKCV36?tag=readleng-20&linkCode=ur1',
  },
  {
    img:
      'https://images-na.ssl-images-amazon.com/images/G/01/audible/associates/SA30_ALH_728x90.png',
    link: 'https://www.amazon.com/dp/B07WT67CPC?tag=readleng-20&linkCode=ur1',
  },
  {
    img:
      'https://images-na.ssl-images-amazon.com/images/G/01/kindle/merch/2015/campaign/KM/KM-Associates-US-728x90.jpg',
    link: 'https://www.amazon.com/dp/B00OQVZDJM/?tag=readleng-20&linkCode=ur1',
  },
  {
    img:
      'https://images-na.ssl-images-amazon.com/images/G/01/kindle/merch/2014/campaign/G7/K/K-Associates-728x90.jpg',
    link:
      'https://www.amazon.com/dp/B00I15SB16/ref=as_acph_kd_918_on?tag=readleng-20&linkCode=ur1',
  },
  {
    img:
      'https://images-na.ssl-images-amazon.com/images/G/01/kindle/ku/2MFT/ku_acq_2MFT_FullBanner_468x60._CB426061213_.jpg',
    link: 'https://www.amazon.com/ku2monthsfree?tag=readleng-20&linkCode=ur1',
  },
]

const randomAd = () => ads[Math.floor(Math.random() * ads.length)]

class Ad extends React.PureComponent {
  render() {
    const ad = randomAd()
    return (
      <AdStyles>
        <p className="head">Advertisement</p>
        <a href={ad.link}>
          <img src={ad.img} alt="Advertisement" />
        </a>
      </AdStyles>
    )
  }
}

export default Ad
