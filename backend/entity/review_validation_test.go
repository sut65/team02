package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestReviewTopicValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	// ตรวจสอบค่าว่างของหัวข้อรีวิวแล้วต้องเจอ Error
	t.Run("Check ReviewTopic blank", func(t *testing.T) {
		review := Review{
			ReviewTopic:  "",
			ReviewDetail: "ดีมาก",
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณากรอกหัวข้อ"))
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
		g.Expect(err.Error()).To(Equal("หัวข้อการเขียนรีวิวมีความยาวไม่เกิน 20 ตัวอักษร"))
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
		g.Expect(err.Error()).To(Equal("หัวข้อการเขียนรีวิวมีความยาวไม่ต่ำกว่า 3 ตัวอักษร"))
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
		g.Expect(err.Error()).To(Equal("ต้องเป็นตัวอักษรเท่านั้น"))
	})
}

func TestReviewDetailValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	// ตรวจสอบค่าว่างของหัวข้อรีวิวแล้วต้องเจอ Error
	t.Run("Check ReviewTopic blank", func(t *testing.T) {
		review := Review{
			ReviewTopic:  "DDDDD",
			ReviewDetail: "",
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("ใส่รายละเอียดด้วยจ้า"))
	})

	// ตรวจสอบ หรายละเอียดรีวิวต้องมีความยาวไม่เกิน 100 ตัวอักษรแล้วเจอ Error
	t.Run("Check ReviewDetail max 100", func(t *testing.T) {
		review := Review{
			ReviewTopic:  "sssseeeddd",
			ReviewDetail: "1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890",
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("รายละเอียดการเขียนรีวิวมีความยาวไม่เกิน 100 ตัวอักษร"))
	})

	// ตรวจสอบ รายละเอียดรีวิวต้องมีความยาวไม่ต่ำกว่า 5 ตัวอักษรแล้วเจอ Error
	t.Run("Check ReviewTopic min 3", func(t *testing.T) {
		review := Review{
			ReviewTopic:  "ssdsff",
			ReviewDetail: "ดี",
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("รายละเอียดการเขียนรีวิวมีความยาวไม่ต่ำกว่า 5 ตัวอักษร"))
	})

}
