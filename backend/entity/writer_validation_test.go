package entity

import (
	"fmt"
	"testing"

	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestWriterCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Writer", func(t *testing.T) {
		writer := Writer{

			Name:            "มาลัย จันทรประดิษฐ์",
			Writer_birthday: time.Date(1997, 5, 12, 9, 30, 00, 00, time.Now().Local().Location()),
			Pseudonym:       "รัตติกาล",
			Email:           "malai@gmail.com",
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

func TestWriterNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	writer := Writer{

		Name:            "",
		Writer_birthday: time.Date(1997, 5, 12, 9, 30, 00, 00, time.Now().Local().Location()),
		Pseudonym:       "รัตติกาล",
		Email:           "malai@gmail.com",
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(writer)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อ-นามสกุล"))

}

func TestWriterWriterBirthdayNotBeFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	writer := Writer{

		Name:            "มาลัย จันทรประดิษฐ์",
		Writer_birthday: time.Now().Add(24 * time.Hour),
		Pseudonym:       "รัตติกาล",
		Email:           "malai@gmail.com",
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(writer)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่และเวลาต้องไม่เป็นอนาคต"))

}

func TestWriterPseudonymNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	writer := Writer{

		Name:            "มาลัย จันทรประดิษฐ์",
		Writer_birthday: time.Date(1997, 5, 12, 9, 30, 00, 00, time.Now().Local().Location()),
		Pseudonym:       "",
		Email:           "malai@gmail.com",
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(writer)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกนามปากกา"))

}

func TestWriterEmailNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	writer := Writer{

		Name:            "มาลัย จันทรประดิษฐ์",
		Writer_birthday: time.Date(1997, 5, 12, 9, 30, 00, 00, time.Now().Local().Location()),
		Pseudonym:       "รัตติกาล",
		Email:           "",
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

		Name:            "มาลัย จันทรประดิษฐ์",
		Writer_birthday: time.Date(1997, 5, 12, 9, 30, 00, 00, time.Now().Local().Location()),
		Pseudonym:       "รัตติกาล",
		Email:           "malai@gmail",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(writer)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("รูปแบบอีเมล์ไม่ถูกต้อง"))
}
