package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestReaderCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Reader", func(t *testing.T) {
		reader := Reader{

			Name:  "ชาลิสา ชุ่มเย็น",
			Email: "chalisa01@gmail.com",
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(reader)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

func TestReaderNameNotbeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	reader := Reader{

		Name:  "", //ผิด
		Email: "chalisa01@gmail.com",
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reader)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อ"))

}

func TestReaderEmailNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	reader := Reader{

		Name:  "ชาลิสา ชุ่มเย็น", //ผิด
		Email: "",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reader)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกอีเมล์"))
}

func TestReaderEmail(t *testing.T) {
	g := NewGomegaWithT(t)
	reader := Reader{

		Name:  "ชาลิสา ชุ่มเย็น", //ผิด
		Email: "chalisa01@gmail",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reader)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรอกอีเมล์ไม่ถูก"))
}
