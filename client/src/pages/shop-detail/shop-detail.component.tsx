import { FreeMode, Navigation, Thumbs } from "swiper"
import { useState } from "react"
import p1Img from "../../assets/images/product-1.png"
import p2Img from "../../assets/images/product-2.png"
import p3Img from "../../assets/images/product-3.png"
import p4Img from "../../assets/images/product-4.png"
import {
  AddToCardContainer,
  ButtonContainer,
  DetailContainer,
  ImageContainer,
  ImageShow,
  ImageThumbnail,
  ImageThumbnailContainer,
  ListContainer,
  PriceText,
  ShopDetailContainer,
  ShortText,
  TitleContainer,
} from "./shop-detail.styles"
import NumberFormat from "react-number-format"
import Button from "../../components/button/button.component"
import { BiCartAlt } from "react-icons/bi"

function ShopDetail() {
  const book = {
    title: "Unlocking Android",
    isbn: "1933988673",
    pageCount: 416,
    publishedDate: { $date: "2009-04-01T00:00:00.000-0700" },
    thumbnailUrl:
      "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
    shortDescription:
      "Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout.",
    longDescription:
      "Android is an open source mobile phone platform based on the Linux operating system and developed by the Open Handset Alliance, a consortium of over 30 hardware, software and telecom companies that focus on open standards for mobile devices. Led by search giant, Google, Android is designed to deliver a better and more open and cost effective mobile experience.    Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout. Based on his mobile development experience and his deep knowledge of the arcane Android technical documentation, the author conveys the know-how you need to develop practical applications that build upon or replace any of Androids features, however small.    Unlocking Android: A Developer's Guide prepares the reader to embrace the platform in easy-to-understand language and builds on this foundation with re-usable Java code examples. It is ideal for corporate and hobbyists alike who have an interest, or a mandate, to deliver software functionality for cell phones.    WHAT'S INSIDE:        * Android's place in the market      * Using the Eclipse environment for Android development      * The Intents - how and why they are used      * Application classes:            o Activity            o Service            o IntentReceiver       * User interface design      * Using the ContentProvider to manage data      * Persisting data with the SQLite database      * Networking examples      * Telephony applications      * Notification methods      * OpenGL, animation & multimedia      * Sample Applications  ",
    status: "PUBLISH",
    authors: ["W. Frank Ableson", "Charlie Collins", "Robi Sen"],
    categories: ["Open Source", "Mobile"],
  }
  return (
    <ShopDetailContainer>
      <ImageContainer>
        <ImageShow>
          <img src={p1Img} alt='' />
        </ImageShow>
        <ImageThumbnailContainer>
          <ImageThumbnail>
            <img src={p1Img} alt='' />
          </ImageThumbnail>
          <ImageThumbnail>
            <img src={p2Img} alt='' />
          </ImageThumbnail>
          <ImageThumbnail>
            <img src={p3Img} alt='' />
          </ImageThumbnail>
          <ImageThumbnail>
            <img src={p4Img} alt='' />
          </ImageThumbnail>
        </ImageThumbnailContainer>
      </ImageContainer>
      <DetailContainer>
        <TitleContainer>
          <h2>{book.title}</h2>
          <p>
            ผู้เขียน : <span> {book.authors}</span>
          </p>
        </TitleContainer>
        <PriceText>
          <NumberFormat
            value={1200}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"฿"}
          />
        </PriceText>
        <ShortText>
          เรื่องย่อ :<span>{book.shortDescription}</span>
        </ShortText>
        <ListContainer>
          <li>รหัสสินค้า: {book.isbn}</li>
          <li>
            หมวดหมู่: <span>นิยายวิทยาศาสตร์</span>
          </li>
          <li>
            สำนักพิมพ์: <span>แพรวสำนักพิมพ์ (แปล)</span>
          </li>
        </ListContainer>
        <AddToCardContainer>
          <label htmlFor='qty'>จำนวน</label>
          <input id='qty' type='number' value={1} />
          <ButtonContainer>
            <Button>
              <BiCartAlt />
              <span>ใส่ตระกร้า</span>
            </Button>
          </ButtonContainer>
        </AddToCardContainer>
      </DetailContainer>
    </ShopDetailContainer>
  )
}

export default ShopDetail
