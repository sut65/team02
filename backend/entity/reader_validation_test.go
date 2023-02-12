package entity

import (
	"fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestReaderCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Reader", func(t *testing.T) {
		reader := Reader{

			Name:          "ชาลิสา ชุ่มเย็น",
			Date_of_Birth: time.Date(1997, 5, 12, 9, 30, 00, 00, time.Now().Local().Location()),
			Nickname:      "AliGoddess",
			ReaderCoin:    0,
			Email:         "chalisa01@gmail.com",
			Password:      "123456",
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

func TestReaderNicknameNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	reader := Reader{

		Name:          "ชาลิสา ชุ่มเย็น", //ผิด
		Date_of_Birth: time.Date(1997, 5, 12, 9, 30, 00, 00, time.Now().Local().Location()),
		Nickname:      "",
		ReaderCoin:    0,
		Email:         "chalisa01@gmail.com",
		Password:      "123456",
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reader)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อเล่น"))
}

func TestReaderNameNotbeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	reader := Reader{

		Name:          "", //ผิด
		Date_of_Birth: time.Date(1997, 5, 12, 9, 30, 00, 00, time.Now().Local().Location()),
		Nickname:      "AliGoddess",
		ReaderCoin:    0,
		Email:         "chalisa01@gmail.com",
		Password:      "123456",
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

		Name:          "ชาลิสา ชุ่มเย็น", //ผิด
		Date_of_Birth: time.Date(1997, 5, 12, 9, 30, 00, 00, time.Now().Local().Location()),
		Nickname:      "AliGoddess",
		ReaderCoin:    0,
		Email:         "",
		Password:      "123456",
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

		Name:          "ชาลิสา ชุ่มเย็น", //ผิด
		Date_of_Birth: time.Date(1997, 5, 12, 9, 30, 00, 00, time.Now().Local().Location()),
		Nickname:      "AliGoddess",
		ReaderCoin:    0,
		Email:         "chalisa01mail",
		Password:      "123456",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reader)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรอกอีเมล์ไม่ถูก"))
}

func TestReaderBirthdayNotBeFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	reader := Reader{

		Name:          "ชาลิสา ชุ่มเย็น",
		Date_of_Birth: time.Now().Add(24 * time.Hour),
		Nickname:      "AliGoddess",
		ReaderCoin:    0,
		Email:         "chalisa01@gmail.com",
		Password:      "123456",
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reader)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่และเวลาต้องไม่เป็นอนาคต"))

}

func TestReaderPasswordNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	reader := Reader{

		Name:          "ชาลิสา ชุ่มเย็น",
		Date_of_Birth: time.Date(1997, 5, 12, 9, 30, 00, 00, time.Now().Local().Location()),
		Nickname:      "AliGoddess",
		ReaderCoin:    0,
		Email:         "chalisa01@gmail.com",
		Password:      "", //ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reader)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสผ่าน"))
}

func TestReaderPasswordMin6(t *testing.T) {
	g := NewGomegaWithT(t)

	reader := Reader{

		Name:          "ชาลิสา ชุ่มเย็น",
		Date_of_Birth: time.Date(1997, 5, 12, 9, 30, 00, 00, time.Now().Local().Location()),
		Nickname:      "AliGoddess",
		ReaderCoin:    0,
		Email:         "chalisa01@gmail.com",
		Password:      "1234",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reader)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("รหัสผ่านต้องมีอย่างน้อย 6 ตัว"))
}

func TestReaderReaderCoin(t *testing.T) {
	g := NewGomegaWithT(t)

	fixture := []int{
		-2, -1}

	for _, readercoin := range fixture {
		reader := Reader{

			Name:          "ชาลิสา ชุ่มเย็น",
			Date_of_Birth: time.Date(1997, 5, 12, 9, 30, 00, 00, time.Now().Local().Location()),
			Nickname:      "AliGoddess",
			ReaderCoin:    readercoin,
			Email:         "chalisa01@gmail.com",
			Password:      "123456",
		}

		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(reader)

		//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("จำนวนเหรียญนักอ่านต้องมีค่ามากกว่า 0"))
	}
}
