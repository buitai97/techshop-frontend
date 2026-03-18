const buildS3ImageUrl = (imageKey?: string | null) => {
    if (!imageKey) {
        return "";
    }

    return `https://${import.meta.env.VITE_S3_BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${imageKey}`;
};

const getProductImageKeys = (product?: IProduct) => {
    if (!product) {
        return [];
    }

    const galleryKeys = product.productImages?.map((image) => image.imageKey) ?? [];
    const keys = [product.imageKey, ...galleryKeys].filter((key): key is string => Boolean(key));

    return [...new Set(keys)];
};

const getPrimaryProductImageUrl = (product?: IProduct) => {
    return buildS3ImageUrl(getProductImageKeys(product)[0]);
};

export { buildS3ImageUrl, getProductImageKeys, getPrimaryProductImageUrl };
