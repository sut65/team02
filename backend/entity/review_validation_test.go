package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าว่างของหัวข้อรีวิวแล้วต้องเจอ Error
func TestReviewTopicNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	review := Review{
		Timestamp:    time.Now().Add(time.Second * -599),
		ReviewTopic:  "", // ค่าว่าง
		ReviewDetail: "ชอบบ",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(review)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกหัวข้อ")) // check error message

}

// ตรวจสอบ หัวข้อรีวิว ต้องมีความยาวไม่เกิน 20 ตัวอักษร
func TestReviewTopicMaxstringlength(t *testing.T) {
	g := NewGomegaWithT(t)

	review := Review{
		Timestamp:    time.Now().Add(time.Second * -599),
		ReviewTopic:  "aaaaabbbbbcccccdddddee", // เกิน 20 ตัวอักษร
		ReviewDetail: "ชอบบ",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(review)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("หัวข้อการเขียนรีวิวมีความยาวไม่เกิน 20 ตัวอักษร")) // check error message

}

// ตรวจสอบค่าว่างของ รายละเอียด แล้วต้องเจอ Error
func TestReviewDetailNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	review := Review{
		Timestamp:    time.Now().Add(time.Second * -599),
		ReviewTopic:  "ดี",
		ReviewDetail: "", // ค่าว่าง
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(review)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกรายละเอียด")) // check error message

}

// ตรวจสอบ รายละเอียด ต้องมีความยาวไม่เกิน 100 ตัวอักษร
func TestReviewDetailmaxstringlength(t *testing.T) {
	g := NewGomegaWithT(t)

	review := Review{
		Timestamp:    time.Now().Add(time.Second * -599),
		ReviewTopic:  "ดี",
		ReviewDetail: "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890321", // เกิน 100 ตัวอักษร
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(review)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("รายละเอียดมีความยาวไม่เกิน 100 ตัวอักษร")) // check error message

}
