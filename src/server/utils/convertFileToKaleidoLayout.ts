import { IElementLayout, IKaleidoLayout, ISource, ISourceElement, ISourceLayout } from "../../sharedcode/layoutInterface";

export const convertLayoutFileToSourceLayout = (file: IKaleidoLayout): IKaleidoLayout => {
    let kaleidoLayout: IKaleidoLayout = {
        sources: []
    };

    file.sources?.forEach((source: ISource, index: number) => {
        if (!source.useSourceLayout) {
            kaleidoLayout.sources?.push(source);
        } else {
            const layout: ISourceLayout =
                file.layouts?.find((layout) => layout.sourceLayoutName === source.useSourceLayout) as ISourceLayout;
            if (!layout) {
                throw new Error(`Error reading Layout ${source.useSourceLayout} `);
            }

            let kaleidoSource: ISource = {
                sourceElements: [],
                emberStateIndex: source.emberStateIndex,
                positionX: source.positionX,
                positionY: source.positionY,
                width: source.width || layout.width,
                height: source.height || layout.height,
                tallyColors: source.tallyColors || layout.tallyColors,
                borderWidth: source.borderWidth || layout.borderWidth,
                borderColor: source.borderColor || layout.borderColor,
            }
            source.sourceElements.forEach((sourceElement: ISourceElement, index: number) => {
                const elementLayout: IElementLayout = layout.elementLayouts[index];
                let kaleidoSourceElement: ISourceElement = {
                    labelIndex: sourceElement.labelIndex || elementLayout.labelIndex,
                    tallyIndex: sourceElement.tallyIndex || elementLayout.tallyIndex,
                    clockTimeZone: sourceElement.clockTimeZone,
                    clockFormat: sourceElement.clockFormat,
                    positionX: sourceElement.positionX || elementLayout.positionX,
                    positionY: sourceElement.positionY || elementLayout.positionY,
                    borderOnlyTally: sourceElement.borderOnlyTally || elementLayout.borderOnlyTally,
                    width: sourceElement.width || elementLayout.width,
                    height: sourceElement.height || elementLayout.height,
                    fontSize: sourceElement.fontSize || elementLayout.fontSize,
                    color: sourceElement.color || elementLayout.color,
                    backgroundColor: sourceElement.backgroundColor || elementLayout.backgroundColor,
                    borderWidth: sourceElement.borderWidth || elementLayout.borderWidth,
                    borderColor: sourceElement.borderColor || elementLayout.borderColor,
                }
                kaleidoSource.sourceElements.push(kaleidoSourceElement);
            });
            kaleidoLayout.sources?.push(kaleidoSource);
        }
    });

    return kaleidoLayout;
};
