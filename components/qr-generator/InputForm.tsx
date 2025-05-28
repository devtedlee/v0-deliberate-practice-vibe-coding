"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, Mail, Phone, Globe, Type } from "lucide-react"
import { dataTypes } from "@/data/qrGeneratorDefaults"
import { QrCodeUtils } from "@/utils/qrCodeUtils"

interface InputFormProps {
  value: string
  onValueChange: (value: string, dataType: string) => void
  hasError: boolean
}

export default function InputForm({ value, onValueChange, hasError }: InputFormProps) {
  const [dataType, setDataType] = useState("url")
  const [wifiData, setWifiData] = useState({ ssid: "", password: "", security: "WPA" as const })
  const [contactData, setContactData] = useState({
    name: "",
    phone: "",
    email: "",
    organization: "",
    url: "",
  })

  const handleDataTypeChange = (newType: string) => {
    setDataType(newType)
    // 데이터 타입 변경 시 기본값 설정
    const defaultValue = dataTypes.find((type) => type.value === newType)?.placeholder || ""
    onValueChange(defaultValue, newType)
  }

  const handleWifiGenerate = () => {
    if (wifiData.ssid) {
      const wifiQrData = QrCodeUtils.generateWifiQrData(wifiData.ssid, wifiData.password, wifiData.security)
      onValueChange(wifiQrData, "wifi")
    }
  }

  const handleContactGenerate = () => {
    if (contactData.name) {
      const vCardData = QrCodeUtils.generateVCardData(contactData)
      onValueChange(vCardData, "contact")
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "url":
        return <Globe className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      case "wifi":
        return <Wifi className="h-4 w-4" />
      default:
        return <Type className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      {/* 데이터 타입 선택 */}
      <div className="space-y-2">
        <Label htmlFor="data-type">데이터 타입</Label>
        <Select value={dataType} onValueChange={handleDataTypeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {dataTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <div className="flex items-center">
                  {getIcon(type.value)}
                  <span className="ml-2">{type.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 기본 입력 필드 */}
      {dataType !== "wifi" && dataType !== "contact" && (
        <div className="space-y-2">
          <Label htmlFor="qr-input">{dataTypes.find((type) => type.value === dataType)?.label || "입력"}</Label>
          {dataType === "text" ? (
            <Textarea
              id="qr-input"
              value={value}
              onChange={(e) => onValueChange(e.target.value, dataType)}
              placeholder={dataTypes.find((type) => type.value === dataType)?.placeholder}
              className={hasError ? "border-red-500" : ""}
              rows={4}
            />
          ) : (
            <Input
              id="qr-input"
              type={dataType === "email" ? "email" : dataType === "phone" ? "tel" : "text"}
              value={value}
              onChange={(e) => onValueChange(e.target.value, dataType)}
              placeholder={dataTypes.find((type) => type.value === dataType)?.placeholder}
              className={hasError ? "border-red-500" : ""}
            />
          )}
        </div>
      )}

      {/* WiFi 설정 */}
      {dataType === "wifi" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Wifi className="mr-2 h-4 w-4" />
              WiFi 정보
            </CardTitle>
            <CardDescription className="text-sm">WiFi 네트워크 정보를 입력하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="wifi-ssid">네트워크 이름 (SSID)</Label>
              <Input
                id="wifi-ssid"
                value={wifiData.ssid}
                onChange={(e) => setWifiData((prev) => ({ ...prev, ssid: e.target.value }))}
                placeholder="WiFi 네트워크 이름"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-password">비밀번호</Label>
              <Input
                id="wifi-password"
                type="password"
                value={wifiData.password}
                onChange={(e) => setWifiData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="WiFi 비밀번호"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-security">보안 타입</Label>
              <Select
                value={wifiData.security}
                onValueChange={(value: "WPA" | "WEP" | "nopass") =>
                  setWifiData((prev) => ({ ...prev, security: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">보안 없음</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleWifiGenerate} disabled={!wifiData.ssid} className="w-full">
              WiFi QR 코드 생성
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 연락처 설정 */}
      {dataType === "contact" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              연락처 정보
            </CardTitle>
            <CardDescription className="text-sm">연락처 정보를 입력하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="contact-name">이름 *</Label>
              <Input
                id="contact-name"
                value={contactData.name}
                onChange={(e) => setContactData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="홍길동"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">전화번호</Label>
              <Input
                id="contact-phone"
                type="tel"
                value={contactData.phone}
                onChange={(e) => setContactData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="010-1234-5678"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">이메일</Label>
              <Input
                id="contact-email"
                type="email"
                value={contactData.email}
                onChange={(e) => setContactData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-org">회사/조직</Label>
              <Input
                id="contact-org"
                value={contactData.organization}
                onChange={(e) => setContactData((prev) => ({ ...prev, organization: e.target.value }))}
                placeholder="회사명"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-url">웹사이트</Label>
              <Input
                id="contact-url"
                type="url"
                value={contactData.url}
                onChange={(e) => setContactData((prev) => ({ ...prev, url: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>
            <Button onClick={handleContactGenerate} disabled={!contactData.name} className="w-full">
              연락처 QR 코드 생성
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
