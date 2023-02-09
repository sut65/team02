package entity

import (
	"fmt"
	"testing"

	//"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestFictionCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Fiction", func(t *testing.T) {

		fiction := Fiction{
			Fiction_Name:        "นมตราหมีดีที่สุด",
			Fiction_Description: "ในวันที่เธอนั้นแก่ สายตาเริ่มแย่ อยากให้ใครมาเดินอยู่ใกล้ๆ",
			Fiction_Story:       "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(fiction)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

func TestFictionName(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check FictionName Not blank ", func(t *testing.T) {

		fiction := Fiction{
			Fiction_Name:        "", //ผิด
			Fiction_Description: "ในวันที่เธอนั้นแก่ สายตาเริ่มแย่ อยากให้ใครมาเดินอยู่ใกล้ๆ",
			Fiction_Story:       "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(fiction)

		//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("ต้องเพิ่มชื่อนิยายด้วยนะ"))
	})

	t.Run("Check FictionName Min3", func(t *testing.T) {

		fiction := Fiction{
			Fiction_Name:        "นม", //ผิด
			Fiction_Description: "ในวันที่เธอนั้นแก่ สายตาเริ่มแย่ อยากให้ใครมาเดินอยู่ใกล้ๆ",
			Fiction_Story:       "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(fiction)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อนิยายเพิ่มเติม"))
	})

	t.Run("Check Fiction Name Max120", func(t *testing.T) {

		fiction := Fiction{
			Fiction_Name:        "่aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", //ผิด
			Fiction_Description: "ในวันที่เธอนั้นแก่ สายตาเริ่มแย่ อยากให้ใครมาเดินอยู่ใกล้ๆ",
			Fiction_Story:       "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(fiction)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("ชื่อนิยายต้องสั้นกว่านี้อีกหน่อยนะ"))
	})
}

func TestFictionDescription(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check FictionDescription Not blank ", func(t *testing.T) {

		fiction := Fiction{
			Fiction_Name:        "นมตราหมีดีที่สุด",
			Fiction_Description: "", //ผิด
			Fiction_Story:       "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(fiction)

		//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("ต้องเพิ่มชื่อนิยายด้วยนะ"))
	})

	t.Run("Check FictionDescription Min3", func(t *testing.T) {

		fiction := Fiction{
			Fiction_Name:        "นมตราหมีดีที่สุด",
			Fiction_Description: "ใน", //ผิด
			Fiction_Story:       "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(fiction)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อนิยายเพิ่มเติม"))
	})

	t.Run("Check FictionDescription Max200", func(t *testing.T) {

		fiction := Fiction{
			Fiction_Name:        "นมตราหมีดีที่สุด",
			Fiction_Description: "ในวันที่เธอนั้นแก่ สายตาเริ่มแย่ อยากให้ใครมาเดินอยู่ใกล้ๆ ในวันที่เธอนั้นแก่ สายตาเริ่มแย่ อยากให้ใครมาเดินอยู่ใกล้ๆ ในวันที่เธอนั้นแก่ สายตาเริ่มแย่ อยากให้ใครมาเดินอยู่ใกล้ๆ ในวันที่เธอนั้นแก่ สายตาเริ่มแย่ อยากให้ใครมาเดินอยู่ใกล้ๆ", //ผิด
			Fiction_Story:       "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(fiction)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("ชื่อนิยายต้องสั้นกว่านี้อีกหน่อยนะ"))
	})
}

func TestFictionStory(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check FictionStory Not blank ", func(t *testing.T) {

		fiction := Fiction{
			Fiction_Name:        "นมตราหมีดีที่สุด",
			Fiction_Description: "ในวันที่เธอนั้นแก่ สายตาเริ่มแย่ อยากให้ใครมาเดินอยู่ใกล้ๆ",
			Fiction_Story:       "", //ผิด
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(fiction)

		//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("อย่าลืมเพิ่มเนื้อหานิยายนะ"))
	})

	t.Run("Check FictionStory Min3", func(t *testing.T) {

		fiction := Fiction{
			Fiction_Name:        "นมตราหมีดีที่สุด",
			Fiction_Description: "ในวันที่เธอนั้นแก่ สายตาเริ่มแย่ อยากให้ใครมาเดินอยู่ใกล้ๆ",
			Fiction_Story:       "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", //ผิด
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(fiction)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("แต่งเพิ่มอีกซักนิดนะ"))
	})
}
