package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestReviewTopicValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	// ตรวจสอบ รีวิว ที่ถูกต้อง
	t.Run("Check Review correct", func(t *testing.T) {
		review := Review{
			ReviewTopic:  "ดีมาก",                          //ไม่ว่าง, ยาว 3-20 ตัว และไม่มีตัวอักษรพิเศษ
			ReviewDetail: "สุดยอดไปเลยฮะ ทำอีกทำดีต่อไปนะ", //
		}

		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(review)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))
		fmt.Println(err)
	})

	// ตรวจสอบค่าว่างของหัวข้อรีวิวแล้วต้องเจอ Error
	t.Run("Check ReviewTopic blank", func(t *testing.T) {
		review := Review{
			ReviewTopic:  "",
			ReviewDetail: "ดีมาก",
		}

		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(review)

		//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
		g.Expect(ok).NotTo(BeTrue())
		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())
		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("กรุณาใส่หัวข้อรีวิว"))
	})

	// ตรวจสอบ หัวข้อรีวิวต้องมีความยาวไม่เกิน 20 ตัวอักษรแล้วเจอ Error
	t.Run("Check ReviewTopic max 20", func(t *testing.T) {
		review := Review{
			ReviewTopic:  "sssssbbbbbccccceeeeeddd",
			ReviewDetail: "ดีมาก",
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("หัวข้อการเขียนรีวิวต้องมีความยาวไม่เกิน 20 ตัวอักษร"))
	})

	// ตรวจสอบ หัวข้อรีวิวต้องมีความยาวไม่ต่ำกว่า 3 ตัวอักษรแล้วเจอ Error
	t.Run("Check ReviewTopic min 3", func(t *testing.T) {
		review := Review{
			ReviewTopic:  "ss",
			ReviewDetail: "ดีมาก",
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("หัวข้อการเขียนรีวิวต้องมีความยาวไม่ต่ำกว่า 3 ตัวอักษร"))
	})

	// ตรวจสอบ หัวข้อรีวิวต้องเป็นอักษรเท่านั้นแล้วเจอ Error
	t.Run("Check ReviewTopic is alphabet", func(t *testing.T) {
		review := Review{
			ReviewTopic:  "%/1234-#",
			ReviewDetail: "ดีมากค่าาาาา",
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("ต้องไม่ใช่ตัวเลขหรืออักษรพิเศษ"))
	})
}

func TestReviewDetailValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	// ตรวจสอบค่าว่างของหัวข้อรีวิวแล้วต้องเจอ Error
	t.Run("Check ReviewDetail blank", func(t *testing.T) {
		review := Review{
			ReviewTopic:  "ดีมาก",
			ReviewDetail: "",
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณาใส่รายละเอียดการรีวิว"))
	})

	// ตรวจสอบ หรายละเอียดรีวิวต้องมีความยาวไม่เกิน 100 ตัวอักษรแล้วเจอ Error
	t.Run("Check ReviewDetail max 100", func(t *testing.T) {
		review := Review{
			ReviewTopic:  "ดีมากก",
			ReviewDetail: "1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890",
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("รายละเอียดการเขียนรีวิวต้องมีความยาวไม่เกิน 100 ตัวอักษร"))
	})

	// ตรวจสอบ รายละเอียดรีวิวต้องมีความยาวไม่ต่ำกว่า 5 ตัวอักษรแล้วเจอ Error
	t.Run("Check ReviewTopic min 5", func(t *testing.T) {
		review := Review{
			ReviewTopic:  "เริ่ด",
			ReviewDetail: "ดี",
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("รายละเอียดการเขียนรีวิวต้องมีความยาวไม่ต่ำกว่า 5 ตัวอักษร"))
	})

}
