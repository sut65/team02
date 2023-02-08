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
