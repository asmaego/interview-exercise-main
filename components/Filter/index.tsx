import { Box, Button, Stack } from "@chakra-ui/react";

type FilterElementType = {
    id: string;
    value: string;
    label: string
}

type FilterPropsType = {
    data: Array<FilterElementType>;
    onChange: (type: string) => void;
    selected: string;
}

const Filter = ({ data, onChange, selected }: FilterPropsType) => {

    return (
        <Box>
            <Stack justify='center' direction='row' spacing={8} mb={12}>
                {data?.map(({ id, value, label }: FilterElementType) =>
                    <Button minW={{ md: '120px' }} key={id} colorScheme='teal'
                        variant={value === selected ? 'solid' : 'outline'}
                        onClick={() => onChange(value)}>
                        {label}
                    </Button>
                )}
            </Stack>
        </Box>
    );
};

export default Filter;
