package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestBookshelfCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check format Bookshelf", func(t *testing.T) {
		Bookshelf := Bookshelf_Number{
			Bookshelf_Name: "ชั้นหนังสือของฉัน",
		}
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(Bookshelf)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

func TestBookshelfNameNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	bookshelf := Bookshelf_Number{
		Bookshelf_Name: "", //ผิด
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(bookshelf)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อชั้นหนังสือของคุณ"))
}

func TestBookshelfNameMin2(t *testing.T) {
	g := NewGomegaWithT(t)

	bookshelf := Bookshelf_Number{
		Bookshelf_Name: "ช",
	}
	ok, err := govalidator.ValidateStruct(bookshelf)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("ชื่อชั้นหนังสือของคุณสั้นเกินไป"))
}

func TestBookshelfNameMax50(t *testing.T) {
	g := NewGomegaWithT(t)

	bookshelf := Bookshelf_Number{
		Bookshelf_Name: "ชั้นหนังสือของคุณคือสิ่งนี้สิ่งที่เรียกว่า Bookshelf โอโอ้วว ยะโฮ้ววววววว ไมนิจิ คุโซวววววทาเร๊ะะะะะะะะะะะะะ อ๊ากกกกกกกกกกกกกกกกกก คิเอเต๊นะไซ ไดคักโคววว ชิโงโต๊วว คิเอโร๊วววววววว",
	}
	ok, err := govalidator.ValidateStruct(bookshelf)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("ชื่อชั้นหนังสือของคุณมีความยาวมากเกินไป"))
}
