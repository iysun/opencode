import { Show } from "solid-js"
import { Icon } from "@opencode/ui/icon"
import { IconButton } from "@opencode/ui/icon-button"
import { Tooltip } from "@opencode/ui/tooltip"
import { useI18n } from "@opencode/ui/context/i18n"
import { useFileOpener } from "../context/file-open"

/**
 * Opens the file a tool card touched in the host's side panel, so the diff stays put and the whole
 * file opens alongside it. Works for paths outside the workspace too — the host resolves those.
 *
 * Renders nothing when no opener is mounted (storybook, mobile) so the card degrades to its diff.
 */
export function FileOpenButton(props: { path: string; enabled?: boolean }) {
  const i18n = useI18n()
  const opener = useFileOpener()
  const label = () => i18n.t("ui.file.openInPanel")
  return (
    <Show when={(props.enabled ?? true) && opener && props.path}>
      <Tooltip openDelay={2000} value={label()}>
        <IconButton
          type="button"
          size="small"
          variant="ghost"
          state="rest"
          aria-label={label()}
          data-slot="file-open-in-panel"
          icon={<Icon name="layout-right" />}
          onClick={(event: MouseEvent) => {
            event.stopPropagation()
            event.preventDefault()
            opener!.openFile(props.path)
          }}
        />
      </Tooltip>
    </Show>
  )
}
