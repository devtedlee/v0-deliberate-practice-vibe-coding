"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import { errorCorrectionLevels, sizePresets, colorPresets, type QrSettings } from "@/data/qrGeneratorDefaults"

interface CustomizationPanelProps {
  settings: QrSettings
  onSettingsUpdate: (settings: Partial<QrSettings>) => void
  onLogoUpload: (file: File) => void
}

export default function CustomizationPanel({ settings, onSettingsUpdate, onLogoUpload }: CustomizationPanelProps) {
  const handleLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      onLogoUpload(file)
    }
  }

  const handleColorPresetSelect = (preset: { fg: string; bg: string }) => {
    onSettingsUpdate({
      fgColor: preset.fg,
      bgColor: preset.bg,
    })
  }

  return (
    <div className="space-y-6">
      {/* 크기 설정 */}
      <div className="space-y-3">
        <Label>크기: {settings.size}px</Label>
        <Slider
          value={[settings.size]}
          onValueChange={(value) => onSettingsUpdate({ size: value[0] })}
          max={1024}
          min={128}
          step={32}
          className="w-full"
        />
        <div className="flex flex-wrap gap-1">
          {sizePresets.map((preset) => (
            <Button
              key={preset.value}
              variant="outline"
              size="sm"
              onClick={() => onSettingsUpdate({ size: preset.value })}
              className={`text-xs ${settings.size === preset.value ? "bg-blue-50 border-blue-200" : ""}`}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 색상 설정 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">색상 설정</CardTitle>
          <CardDescription className="text-sm">QR 코드의 색상을 변경하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="fg-color">전경색 (QR 코드)</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="fg-color"
                  type="color"
                  value={settings.fgColor}
                  onChange={(e) => onSettingsUpdate({ fgColor: e.target.value })}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={settings.fgColor}
                  onChange={(e) => onSettingsUpdate({ fgColor: e.target.value })}
                  className="flex-1 text-xs font-mono"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bg-color">배경색</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="bg-color"
                  type="color"
                  value={settings.bgColor}
                  onChange={(e) => onSettingsUpdate({ bgColor: e.target.value })}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={settings.bgColor}
                  onChange={(e) => onSettingsUpdate({ bgColor: e.target.value })}
                  className="flex-1 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">색상 프리셋</Label>
            <div className="grid grid-cols-1 gap-1">
              {colorPresets.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleColorPresetSelect(preset)}
                  className="justify-start text-xs h-8"
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded border" style={{ backgroundColor: preset.fg }} title="전경색" />
                      <div className="w-3 h-3 rounded border" style={{ backgroundColor: preset.bg }} title="배경색" />
                    </div>
                    <span>{preset.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 에러 교정 레벨 */}
      <div className="space-y-2">
        <Label htmlFor="error-level">에러 교정 레벨</Label>
        <Select
          value={settings.level}
          onValueChange={(value: "L" | "M" | "Q" | "H") => onSettingsUpdate({ level: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {errorCorrectionLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                <div>
                  <div className="font-medium">{level.label}</div>
                  <div className="text-xs text-gray-500">{level.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 여백 설정 */}
      <div className="flex items-center space-x-2">
        <Switch
          id="include-margin"
          checked={settings.includeMargin}
          onCheckedChange={(checked) => onSettingsUpdate({ includeMargin: checked })}
        />
        <Label htmlFor="include-margin" className="text-sm">
          여백 포함
        </Label>
      </div>

      {/* 로고 업로드 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">로고 설정</CardTitle>
          <CardDescription className="text-sm">QR 코드 중앙에 로고를 추가하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.logoImage ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={settings.logoImage || "/placeholder.svg"}
                    alt="로고"
                    className="w-8 h-8 object-contain rounded"
                  />
                  <span className="text-sm">로고 업로드됨</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => onSettingsUpdate({ logoImage: null })}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="logo-width">로고 너비</Label>
                  <Input
                    id="logo-width"
                    type="number"
                    value={settings.logoWidth || 60}
                    onChange={(e) => onSettingsUpdate({ logoWidth: Number.parseInt(e.target.value) || 60 })}
                    min={20}
                    max={200}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo-height">로고 높이</Label>
                  <Input
                    id="logo-height"
                    type="number"
                    value={settings.logoHeight || 60}
                    onChange={(e) => onSettingsUpdate({ logoHeight: Number.parseInt(e.target.value) || 60 })}
                    min={20}
                    max={200}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <input type="file" accept="image/*" onChange={handleLogoFileChange} className="hidden" id="logo-upload" />
              <Label htmlFor="logo-upload">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">로고 이미지 업로드</p>
                  <p className="text-xs text-gray-500">PNG, JPG, SVG 지원</p>
                </div>
              </Label>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
