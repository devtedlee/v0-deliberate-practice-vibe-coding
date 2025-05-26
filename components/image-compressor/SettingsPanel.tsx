"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  outputFormatOptions,
  qualityPresets,
  sizePresets,
  type CompressionOptions,
} from "@/data/imageCompressorDefaults"

interface SettingsPanelProps {
  options: CompressionOptions
  onOptionsUpdate: (options: Partial<CompressionOptions>) => void
}

export default function SettingsPanel({ options, onOptionsUpdate }: SettingsPanelProps) {
  const handleQualityChange = (value: number[]) => {
    onOptionsUpdate({ quality: value[0] / 100 })
  }

  const handlePresetSelect = (preset: { width: number; height: number }) => {
    onOptionsUpdate({
      maxWidth: preset.width,
      maxHeight: preset.height,
    })
  }

  return (
    <div className="space-y-6">
      {/* 출력 포맷 */}
      <div className="space-y-2">
        <Label htmlFor="output-format">출력 포맷</Label>
        <Select
          value={options.outputFormat}
          onValueChange={(value: "jpeg" | "png" | "webp") => onOptionsUpdate({ outputFormat: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {outputFormatOptions.map((format) => (
              <SelectItem key={format.value} value={format.value}>
                <div>
                  <div className="font-medium">{format.label}</div>
                  <div className="text-xs text-gray-500">{format.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 품질 설정 */}
      <div className="space-y-3">
        <Label>압축 품질: {Math.round(options.quality * 100)}%</Label>
        <Slider
          value={[options.quality * 100]}
          onValueChange={handleQualityChange}
          max={100}
          min={10}
          step={5}
          className="w-full"
        />
        <div className="flex flex-wrap gap-1">
          {qualityPresets.map((preset) => (
            <Button
              key={preset.value}
              variant="outline"
              size="sm"
              onClick={() => onOptionsUpdate({ quality: preset.value })}
              className={`text-xs ${
                Math.abs(options.quality - preset.value) < 0.01 ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 크기 설정 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">크기 설정</CardTitle>
          <CardDescription className="text-sm">최대 너비와 높이를 설정하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="max-width">최대 너비 (px)</Label>
              <Input
                id="max-width"
                type="number"
                value={options.maxWidth}
                onChange={(e) => onOptionsUpdate({ maxWidth: Number.parseInt(e.target.value) || 1920 })}
                min={100}
                max={4000}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-height">최대 높이 (px)</Label>
              <Input
                id="max-height"
                type="number"
                value={options.maxHeight}
                onChange={(e) => onOptionsUpdate({ maxHeight: Number.parseInt(e.target.value) || 1080 })}
                min={100}
                max={4000}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="maintain-aspect-ratio"
              checked={options.maintainAspectRatio}
              onCheckedChange={(checked) => onOptionsUpdate({ maintainAspectRatio: checked })}
            />
            <Label htmlFor="maintain-aspect-ratio" className="text-sm">
              가로세로 비율 유지
            </Label>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">크기 프리셋</Label>
            <div className="grid grid-cols-1 gap-1">
              {sizePresets.map((preset) => (
                <Button
                  key={preset.label}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePresetSelect(preset)}
                  className="justify-start text-xs h-8"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
