package entity

import (
	"fmt"
	"testing"

	//"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestWriterCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Writer", func(t *testing.T) {
		writer := Writer{

			Pseudonym: "รัตติกาล",
			Email:     "writer01@gmail.com",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(writer)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

func TestWriterPseudonym(t *testing.T) {
	g := NewGomegaWithT(t)

	writer := Writer{

		Pseudonym: "",
		Email:     "writer01@gmail.com",
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(writer)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกนามปาก"))

}

func TestWriterEmailNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	writer := Writer{

		Pseudonym: "รัตติกาล",
		Email:     "", //ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(writer)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกอีเมล์"))
}

func TestWriterEmail(t *testing.T) {
	g := NewGomegaWithT(t)
	writer := Writer{

		Pseudonym: "รัตติกาล",
		Email:     "writer01@gmail",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(writer)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรอกอีเมล์ไม่ถูก"))
}
