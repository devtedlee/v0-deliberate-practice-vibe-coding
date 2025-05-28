"use client"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Link,
  ImageIcon,
  Code,
  FileCode,
  List,
  ListOrdered,
  Quote,
  Minus,
  Table,
  Download,
  Upload,
  Maximize,
  Save,
  Strikethrough,
} from "lucide-react"
import { toolbarItems } from "@/data/markdownDefaults"

interface ToolbarProps {
  onInsert: (syntax: string) => void
  onExport: () => void
  onImport: () => void
  onFullscreen: () => void
  onSave: () => void
}

export function Toolbar({ onInsert, onExport, onImport, onFullscreen, onSave }: ToolbarProps) {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Bold":
        return <Bold size={18} />
      case "Italic":
        return <Italic size={18} />
      case "Heading1":
        return <Heading1 size={18} />
      case "Heading2":
        return <Heading2 size={18} />
      case "Heading3":
        return <Heading3 size={18} />
      case "Link":
        return <Link size={18} />
      case "Image":
        return <ImageIcon size={18} />
      case "Code":
        return <Code size={18} />
      case "FileCode":
        return <FileCode size={18} />
      case "List":
        return <List size={18} />
      case "ListOrdered":
        return <ListOrdered size={18} />
      case "Quote":
        return <Quote size={18} />
      case "Minus":
        return <Minus size={18} />
      case "Table":
        return <Table size={18} />
      case "Strikethrough":
        return <Strikethrough size={18} />
      default:
        return <Code size={18} />
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between p-2 bg-gray-50 border-b border-gray-200">
      <div className="flex flex-wrap items-center space-x-1">
        <TooltipProvider>
          {toolbarItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onInsert(item.syntax)}
                  className="h-8 px-2"
                  aria-label={item.label}
                >
                  {getIconComponent(item.icon)}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={onImport} className="h-8 px-2" aria-label="가져오기">
                <Upload size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>마크다운 파일 가져오기</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={onExport} className="h-8 px-2" aria-label="내보내기">
                <Download size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>마크다운 파일 내보내기</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={onSave} className="h-8 px-2" aria-label="저장">
                <Save size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>로컬에 저장</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={onFullscreen} className="h-8 px-2" aria-label="전체화면">
                <Maximize size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>전체화면 모드</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
