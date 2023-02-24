package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestAdminCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Admin", func(t *testing.T) {
		admin := Admin{
			Admin_firstname: "Medison",
			Admin_lastname:  "Beer",
			Admin_email:     "Beer1999@gmail.com",
			Admin_tel:       "0912345678",
			Admin_password:  "123456",
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(admin)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

func TestAdmin_tel(t *testing.T) {
	g := NewGomegaWithT(t)
	fixtures := []string{
		"0000000000",  // เป็น 0
		"0200000000",  // ขึ้นต้นด้วย 0 ตามด้วย 2 และตามด้วย string 8 ตัว
		"090-0000000", // มีขีดคั่น
		"080000000",   // ขึ้นต้นด้วย 0 ตามด้วย 8 และตามด้วย string 7 ตัว
		"9912345678",  // ขึ้นต้นด้วย 9
		"090",         // ตัวอักษร 3 ตัว
		"0",           // ตัวอักษร 1 ตัว
	}

	for _, admin_tel := range fixtures {
		admin := Admin{
			Admin_firstname: "Medison",
			Admin_lastname:  "Beer",
			Admin_email:     "Beer1999@gmail.com",
			Admin_tel:       admin_tel, //ผิด
			Admin_password:  "123456",
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(admin)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("กรอกเบอร์โทรไม่ถูก"))
	}
}

func TestAdminTelNotbeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	admin := Admin{
		Admin_firstname: "Medison",
		Admin_lastname:  "Beer",
		Admin_email:     "Beer1999@gmail.com",
		Admin_tel:       "", // ผิด
		Admin_password:  "123456",
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(admin)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเบอร์โทร"))

}

func TestAdminFirstNameNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	admin := Admin{
		Admin_firstname: "", // ผิด
		Admin_lastname:  "Beer",
		Admin_email:     "Beer1999@gmail.com",
		Admin_tel:       "0912345678",
		Admin_password:  "123456",
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(admin)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อ"))

}

func TestAdminLastNameNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	admin := Admin{
		Admin_firstname: "Medison",
		Admin_lastname:  "", // ผิด
		Admin_email:     "Beer1999@gmail.com",
		Admin_tel:       "0912345678",
		Admin_password:  "123456",
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(admin)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกนามสกุล"))

}

func TestAdminEmailNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	admin := Admin{
		Admin_firstname: "Medison",
		Admin_lastname:  "Beer",
		Admin_email:     "", // ผิด
		Admin_tel:       "0912345678",
		Admin_password:  "123456",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(admin)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกอีเมล์"))
}

func TestAdminEmail(t *testing.T) {
	g := NewGomegaWithT(t)
	admin := Admin{
		Admin_firstname: "Medison",
		Admin_lastname:  "Beer",
		Admin_email:     "Beer1999@gmail", // ผิด
		Admin_tel:       "0912345678",
		Admin_password:  "123456",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(admin)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรอกอีเมล์ไม่ถูก"))
}

func TestAdminPasswordNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	admin := Admin{
		Admin_firstname: "Medison",
		Admin_lastname:  "Beer",
		Admin_email:     "Beer1999@gmail.com",
		Admin_tel:       "0912345678",
		Admin_password:  "", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(admin)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสผ่าน"))
}

func TestAdminPasswordMin6(t *testing.T) {
	g := NewGomegaWithT(t)
	admin := Admin{
		Admin_firstname: "Medison",
		Admin_lastname:  "Beer",
		Admin_email:     "Beer1999@gmail.com",
		Admin_tel:       "0912345678",
		Admin_password:  "12345", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(admin)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("รหัสผ่านต้องมีอย่างน้อย 6 ตัว"))
}
